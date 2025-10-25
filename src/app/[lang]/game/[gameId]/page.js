import { notFound } from 'next/navigation';
import { getGameConfig, isValidGameId } from '@/app/config/gamesConfig';
import GameEmbed from '@/app/components/GameEmbed';

// Configure Edge Runtime for Cloudflare deployment
export const runtime = 'edge';

/**
 * Generate metadata for the game page
 * This improves SEO and provides proper page titles
 */
export async function generateMetadata({ params, searchParams }) {
  const { lang, gameId } = await params;
  const gameConfig = getGameConfig(gameId);

  if (!gameConfig) {
    return {
      title: 'Game Not Found',
    };
  }

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
 * Game Page Component (Server Component)
 * Supports both dynamic route params and query params for flexibility
 *
 * Usage:
 * - Route param: /game/matching-game-1
 * - Query param: /game?id=matching-game-1
 * - Combined: /game/matching-game-1?theme=dark
 */
export default async function GamePage({ params, searchParams }) {
  // Await promises as per Next.js 15 requirements
  const { lang, gameId: routeGameId } = await params;
  const resolvedSearchParams = await searchParams;

  // Support both route param and query param for game ID
  // Route param takes precedence
  const gameId = routeGameId || resolvedSearchParams.id;

  // Validate game exists
  if (!gameId || !isValidGameId(gameId)) {
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

/**
 * Generate static params for known games (optional)
 * This pre-renders pages at build time for better performance
 */
export async function generateStaticParams() {
  const { getAvailableGameIds } = await import('@/app/config/gamesConfig');
  const gameIds = getAvailableGameIds();

  // Generate params for both supported languages
  const params = [];
  const languages = ['en', 'ar'];

  languages.forEach(lang => {
    gameIds.forEach(gameId => {
      params.push({
        lang,
        gameId,
      });
    });
  });

  return params;
}
