# Game Embedding System Documentation

## Overview

This is a secure, Next.js 15-based game embedding system that allows you to embed Wordwall games (or other iframe-based content) without exposing the actual URLs to users. The system uses server-side rendering with dynamic routes and query parameters.

## Features

✅ **URL Obfuscation**: Actual Wordwall URLs are hidden server-side
✅ **Server-Side Rendering**: Fast initial page loads with SSR
✅ **Multiple URL Patterns**: Supports both dynamic routes and query params
✅ **SEO Optimized**: Dynamic metadata generation for each game
✅ **Responsive Design**: Works on all screen sizes
✅ **Loading States**: Beautiful loading and error states
✅ **Security**: Proper iframe sandboxing and security headers
✅ **Static Generation**: Optional pre-rendering at build time
✅ **Internationalization**: Supports multi-language routing

## Architecture

### File Structure

```
src/
├── app/
│   ├── [lang]/
│   │   └── game/
│   │       ├── [gameId]/
│   │       │   ├── page.js          # Dynamic route version
│   │       │   └── not-found.js     # 404 page for invalid games
│   │       └── page.js              # Query param version
│   ├── components/
│   │   └── GameEmbed.js             # Reusable iframe component
│   └── config/
│       └── gamesConfig.js           # Game URL mappings (SERVER-SIDE ONLY)
```

### Key Components

#### 1. `gamesConfig.js` (Server-Side Configuration)

This file maps friendly game IDs to actual Wordwall embed URLs. **This file is never sent to the client**, keeping URLs private.

```javascript
export const gamesConfig = {
  'matching-game-1': {
    url: 'https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&fontStackId=0',
    title: 'Matching Game 1',
    description: 'A fun matching game for learning',
    width: 500,
    height: 380,
  },
  // Add more games...
};
```

#### 2. `GameEmbed.js` (Client Component)

A secure, responsive iframe wrapper with:
- Loading states
- Error handling
- Fullscreen support
- Security attributes (sandbox, referrer policy)
- Accessibility features

#### 3. Game Pages (Server Components)

Two routing approaches:

**Dynamic Route**: `/game/[gameId]`
- Clean URLs: `/game/matching-game-1`
- SEO friendly
- Pre-renderable with `generateStaticParams`

**Query Param Route**: `/game?id=matching-game-1`
- Single base path
- Flexible parameters
- Easy to share

## Usage

### Adding New Games

1. Open `src/app/config/gamesConfig.js`
2. Add a new entry with a unique game ID:

```javascript
'your-game-id': {
  url: 'https://wordwall.net/embed/YOUR_GAME_ID?themeId=3&templateId=5',
  title: 'Your Game Title',
  description: 'Game description for SEO',
  width: 500,
  height: 380,
},
```

3. The game will automatically be available at:
   - `/game/your-game-id`
   - `/game?id=your-game-id`

### URL Patterns

#### Basic Usage

```
# Dynamic route (recommended)
/en/game/matching-game-1
/ar/game/matching-game-1

# Query param route
/en/game?id=matching-game-1
/ar/game?id=matching-game-1
```

#### With Custom Parameters

```
# Custom dimensions
/game/matching-game-1?width=800&height=600

# Fullscreen mode
/game/matching-game-1?fullscreen=true

# Combined
/game?id=quiz-game-1&width=700&height=500&fullscreen=true
```

### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `id` | string | Game identifier (query param route only) | `id=matching-game-1` |
| `width` | number | Custom iframe width in pixels | `width=800` |
| `height` | number | Custom iframe height in pixels | `height=600` |
| `fullscreen` | boolean | Enable fullscreen layout | `fullscreen=true` |

## Security Features

### 1. URL Obfuscation
- Actual Wordwall URLs are stored server-side only
- Users see friendly URLs like `/game/matching-game-1`
- Original URLs never appear in browser network tab or page source

### 2. Iframe Security
The `GameEmbed` component uses strict security attributes:

```javascript
sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
referrerPolicy="no-referrer-when-downgrade"
```

This restricts iframe capabilities while allowing necessary game functionality.

### 3. Server-Side Validation
All game IDs are validated server-side before rendering, preventing injection attacks.

## Performance Optimization

### Static Site Generation (SSG)

The dynamic route version includes `generateStaticParams` to pre-render known games at build time:

```javascript
export async function generateStaticParams() {
  const gameIds = getAvailableGameIds();
  // Pre-render all games for all languages
  return gameIds.map(gameId => ({ gameId }));
}
```

**Benefits:**
- Instant page loads
- Better SEO
- Reduced server load

### Loading Strategy

- Iframes use `loading="lazy"` for better performance
- Loading states prevent layout shift
- Responsive images and containers

## Best Practices

### 1. Game ID Naming Convention

Use descriptive, URL-friendly IDs:
- ✅ Good: `matching-animals`, `math-quiz-grade-3`, `word-search-fruits`
- ❌ Bad: `game1`, `test`, `a`

### 2. Metadata

Always provide complete metadata in `gamesConfig.js`:
```javascript
{
  url: '...',
  title: 'Clear, descriptive title',
  description: 'SEO-friendly description (50-160 characters)',
  width: 500,  // Match Wordwall's recommended size
  height: 380,
}
```

### 3. Dimensions

- Use Wordwall's default dimensions for best compatibility
- Test custom dimensions before deploying
- Consider responsive behavior on mobile devices

### 4. Testing New Games

Before adding to production:
1. Test the Wordwall embed URL directly
2. Verify all game features work in an iframe
3. Check on multiple devices and browsers
4. Test with different theme IDs if needed

## Wordwall Integration

### Getting Embed URLs

1. Go to your Wordwall activity
2. Click "Share" → "Embed"
3. Copy the iframe `src` URL
4. The URL format is: `https://wordwall.net/embed/{ACTIVITY_ID}?themeId={THEME}&templateId={TEMPLATE}&fontStackId={FONT}`

### Customization Parameters

Wordwall URLs support various parameters:
- `themeId`: Visual theme (1-50+)
- `templateId`: Game template type
- `fontStackId`: Font family
- Add these to URLs in `gamesConfig.js`

### Example Wordwall Embed URL

```
https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&fontStackId=0
```

## Troubleshooting

### Game Not Loading

1. **Check game ID**: Verify it exists in `gamesConfig.js`
2. **Test Wordwall URL**: Open the embed URL directly in a browser
3. **Check browser console**: Look for iframe errors
4. **Verify sandbox attributes**: Some games may need adjusted permissions

### 404 Errors

- Ensure game ID matches exactly (case-sensitive)
- Check that the route is correct: `/game/[gameId]` or `/game?id=[gameId]`
- Verify the game exists in `gamesConfig.js`

### Styling Issues

- Adjust width/height in `gamesConfig.js`
- Test with `fullscreen=true` parameter
- Check Tailwind classes in `GameEmbed.js`

### SEO Not Working

- Verify `generateMetadata` function is exporting metadata
- Check that title and description are provided in `gamesConfig.js`
- Use Next.js dev tools to inspect metadata

## Advanced Usage

### Custom Themes

Modify the page wrapper in `game/[gameId]/page.js`:

```javascript
<div className="min-h-screen bg-custom-gradient">
  {/* Game content */}
</div>
```

### Analytics Integration

Add analytics to `GameEmbed.js`:

```javascript
useEffect(() => {
  // Track game loads
  analytics.track('Game Loaded', {
    gameId: title,
    url: window.location.href,
  });
}, [title]);
```

### Custom Loading States

Modify the loading state in `GameEmbed.js` to match your design system.

### Multi-Language Content

Game titles and descriptions can be internationalized by modifying `gamesConfig.js`:

```javascript
'matching-game-1': {
  url: '...',
  title: {
    en: 'Matching Game 1',
    ar: 'لعبة المطابقة 1',
  },
  description: {
    en: 'A fun matching game',
    ar: 'لعبة مطابقة ممتعة',
  },
  // ...
}
```

Then update the page component to use the correct language from `params.lang`.

## Migration Guide

### From Direct Embeds

If you're currently using direct Wordwall iframes:

1. Extract all iframe `src` URLs
2. Create game IDs for each
3. Add to `gamesConfig.js`
4. Replace iframe embeds with links to `/game/[gameId]`

### From External Systems

If games are stored in a database:

1. Create an API route to fetch games
2. Modify `gamesConfig.js` to fetch from your API
3. Update `getGameConfig` to be async
4. Cache game configs for performance

## Support

For issues or questions:
- Check Next.js 15 documentation
- Review Wordwall embed documentation
- Verify all dependencies are up to date

## License

This implementation follows Next.js and React best practices and is compatible with your existing MIT/Apache license.
