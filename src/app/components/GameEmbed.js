'use client';

/**
 * GameEmbed Component - Fullscreen Iframe
 *
 * NOTE: Wordwall's .embed-banner CANNOT be removed due to CORS restrictions.
 * The banner is part of Wordwall's iframe content from a different domain.
 *
 * Options to hide it:
 * 1. Upgrade to Wordwall Premium (removes banner officially)
 * 2. Adjust height below to push banner below viewport (may cut game content)
 */
export default function GameEmbed({ url, title }) {
  return (
    <iframe
      src={url}
      title={title}
      className="fixed top-0 left-0 w-full h-[calc(100vh+18px)] border-0 overflow-hidden"
      allowFullScreen
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="no-referrer-when-downgrade"
      aria-label={`${title} - Interactive game`}
    />
  );
}
