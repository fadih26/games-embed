/**
 * Game Configuration
 * Maps friendly game identifiers to Wordwall embed URLs
 * This keeps URLs hidden from the client and provides a clean API
 */

export const gamesConfig = {
  'matching-game-1': {
    url: 'https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&fontStackId=0',
    title: 'Matching Game 1',
    description: 'A fun matching game for learning',
    width: 500,
    height: 380,
  },
  'matching-game-test': {
    url: 'https://wordwall.net/ar/embed/d4ad152cc47f4e76a949581e6718e0b3?themeId=65&templateId=25&fontStackId=0',
    title: 'Matching Game Test',
    description: 'Arabic matching game',
    width: 500,
    height: 380,
  },
};

/**
 * Get game configuration by ID
 * @param {string} gameId - The game identifier
 * @returns {object|null} Game configuration or null if not found
 */
export function getGameConfig(gameId) {
  return gamesConfig[gameId] || null;
}

/**
 * Get all available game IDs
 * @returns {string[]} Array of game identifiers
 */
export function getAvailableGameIds() {
  return Object.keys(gamesConfig);
}

/**
 * Check if a game ID exists
 * @param {string} gameId - The game identifier to check
 * @returns {boolean} True if game exists
 */
export function isValidGameId(gameId) {
  return gameId in gamesConfig;
}
