'use client';

/**
 * GameEmbed Component - Fullscreen Iframe
 * Displays game in full viewport without any extra UI
 */
export default function GameEmbed({ url, title }) {
  return (
    <iframe
      src={url}
      title={title}
      className="fixed top-0 left-0 w-full h-full border-0"
      allowFullScreen
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="no-referrer-when-downgrade"
      aria-label={`${title} - Interactive game`}
    />
  );
}
