import { redirect, notFound } from 'next/navigation';
import { getGameConfig, isValidGameId } from '@/app/config/gamesConfig';
import GameEmbed from '@/app/components/GameEmbed';

// Configure Edge Runtime for Cloudflare deployment
export const runtime = 'edge';

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

  const gameId = resolvedSearchParams.id;

  if (!gameId || !isValidGameId(gameId)) {
    notFound();
  }

  const gameConfig = getGameConfig(gameId);

  return <GameEmbed url={gameConfig.url} title={gameConfig.title} />;
}
