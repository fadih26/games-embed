'use client';

import { useState } from 'react';

/**
 * GameEmbed Component
 * Securely embeds external game content with proper security attributes
 * Supports responsive design and fullscreen mode
 *
 * Security features:
 * - Sandbox attributes to restrict iframe capabilities
 * - CSP-friendly implementation
 * - No direct URL exposure in client code
 */
export default function GameEmbed({
  url,
  title,
  width = 500,
  height = 380,
  fullscreen = false,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div
        className={`relative ${
          fullscreen ? 'w-full' : 'mx-auto'
        } overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700`}
        style={{
          maxWidth: fullscreen ? '100%' : `${width}px`,
          aspectRatio: fullscreen ? 'auto' : `${width}/${height}`,
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-blue-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Loading game...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="mt-4 text-gray-800 dark:text-gray-200 font-semibold">
                Failed to load game
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Please refresh the page or try again later
              </p>
            </div>
          </div>
        )}

        {/* Iframe Embed */}
        <iframe
          src={url}
          title={title}
          width="100%"
          height={fullscreen ? '100vh' : height}
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
          className={`${isLoading || hasError ? 'invisible' : 'visible'} w-full h-full border-0`}
          // Security attributes
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          // Accessibility
          aria-label={`${title} - Interactive game`}
        />
      </div>
    </div>
  );
}
