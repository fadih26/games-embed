import Link from 'next/link';
import { getAvailableGameIds } from '@/app/config/gamesConfig';

/**
 * Not Found Page for Invalid Games
 * Shows when a game ID doesn't exist in the configuration
 */
export default function GameNotFound() {
  const availableGames = getAvailableGameIds();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        {/* 404 Icon */}
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h1 className="mt-6 text-4xl font-bold text-gray-800 dark:text-white">
            Game Not Found
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Oops! The game you're looking for doesn't exist.
          </p>
        </div>

        {/* Available Games */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Available Games:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableGames.map((gameId) => (
              <Link
                key={gameId}
                href={`/game/${gameId}`}
                className="block p-4 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  {gameId}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
