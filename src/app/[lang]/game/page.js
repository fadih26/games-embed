import { redirect, notFound } from 'next/navigation';
import { getGameConfig, isValidGameId } from '@/app/config/gamesConfig';
import GameEmbed from '@/app/components/GameEmbed';

/**
 * Generate metadata for the game page
 */
export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const gameId = resolvedSearchParams.id;

  if (!gameId || !isValidGameId(gameId)) {
    return {
      title: 'Game Not Found',
    };
  }

  const gameConfig = getGameConfig(gameId);

  return {
    title: `${gameConfig.title} | Educational Games`,
    description: gameConfig.description,
    openGraph: {
      title: gameConfig.title,
      description: gameConfig.description,
    },
  };
}

/**
 * Query Param Based Game Page (Server Component)
 * Alternative approach using only query parameters
 *
 * Usage:
 * - /game?id=matching-game-1
 * - /game?id=matching-game-1&width=800&height=600
 * - /game?id=matching-game-1&fullscreen=true
 *
 * This approach is useful when you want all game URLs to have the same base path
 * and only differ by query parameters, keeping URLs even cleaner
 */
export default async function GamePage({ params, searchParams }) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;

  // Get game ID from query params
  const gameId = resolvedSearchParams.id;

  // Redirect to first available game if no ID provided
  if (!gameId) {
    // You could redirect to a games listing page instead
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Game ID Required
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please provide a game ID in the URL
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Example: /game?id=matching-game-1
          </p>
        </div>
      </div>
    );
  }

  // Validate game exists
  if (!isValidGameId(gameId)) {
    notFound();
  }

  // Get game configuration (URL is hidden server-side)
  const gameConfig = getGameConfig(gameId);

  // Extract optional query parameters for customization
  const customWidth = resolvedSearchParams.width
    ? parseInt(resolvedSearchParams.width, 10)
    : gameConfig.width;

  const customHeight = resolvedSearchParams.height
    ? parseInt(resolvedSearchParams.height, 10)
    : gameConfig.height;

  const fullscreen = resolvedSearchParams.fullscreen === 'true';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Game Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {gameConfig.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {gameConfig.description}
          </p>
        </div>

        {/* Game Embed Container */}
        <GameEmbed
          url={gameConfig.url}
          title={gameConfig.title}
          width={customWidth}
          height={customHeight}
          fullscreen={fullscreen}
        />

        {/* Instructions or Additional Info */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
            How to Play
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Click on the game to start interacting</li>
            <li>Follow the on-screen instructions</li>
            <li>Complete the game to see your results</li>
            <li>Try again to improve your score</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
