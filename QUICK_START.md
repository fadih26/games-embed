# Quick Start Guide - Game Embedding System

## 🚀 Get Started in 3 Steps

### Step 1: Add Your Games
Open [src/app/config/gamesConfig.js](src/app/config/gamesConfig.js) and add your Wordwall games:

```javascript
export const gamesConfig = {
  'matching-game-1': {
    url: 'https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&fontStackId=0',
    title: 'Matching Game 1',
    description: 'A fun matching game for learning',
    width: 500,
    height: 380,
  },
  // Add more games here...
};
```

### Step 2: Run the Development Server
```bash
npm run dev
```

### Step 3: Access Your Games
Visit in your browser:
- `http://localhost:3000/en/game/matching-game-1`
- `http://localhost:3000/ar/game/matching-game-1`

## 📝 How to Get Wordwall Embed URLs

1. Go to your Wordwall activity page
2. Click the **"Share"** button
3. Select **"Embed"** tab
4. Copy the URL from the iframe `src` attribute:
   ```html
   <iframe src="THIS_URL_HERE" ...>
   ```
5. Paste it as the `url` value in `gamesConfig.js`

## 🎮 URL Patterns

### Option 1: Clean URLs (Recommended)
```
/en/game/your-game-id
/ar/game/your-game-id
```

### Option 2: Query Parameters
```
/en/game?id=your-game-id
/ar/game?id=your-game-id
```

### With Custom Size
```
/en/game/your-game-id?width=800&height=600
```

## ✅ Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

## 🔒 Security Note

Your Wordwall URLs are **completely hidden** from users. They only see:
- `/game/matching-game-1` (not the actual Wordwall URL)

The real URL is stored server-side and never exposed to the client.

## 📖 Need More Help?

- Full Documentation: [GAME_SYSTEM_README.md](GAME_SYSTEM_README.md)
- Implementation Details: [GAME_IMPLEMENTATION_SUMMARY.md](GAME_IMPLEMENTATION_SUMMARY.md)

## 🎯 Example

Already configured and ready to test:
```
http://localhost:3000/en/game/matching-game-1
```

Just run `npm run dev` and visit the URL!
