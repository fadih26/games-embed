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
  const { lang, gameId: routeGameId } = await params;
  const resolvedSearchParams = await searchParams;

  const gameId = routeGameId || resolvedSearchParams.id;

  if (!gameId || !isValidGameId(gameId)) {
    notFound();
  }

  const gameConfig = getGameConfig(gameId);

  return <GameEmbed url={gameConfig.url} title={gameConfig.title} />;
}
