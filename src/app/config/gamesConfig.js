/**
 * Game Configuration
 * Maps friendly game identifiers to Wordwall embed URLs
 * This keeps URLs hidden from the client and provides a clean API
 */

export const gamesConfig = {
  // Example games - replace with your actual game mappings
  'matching-game-1': {
    url: 'https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&fontStackId=0',
    title: 'Matching Game 1',
    description: 'A fun matching game for learning',
    width: 500,
    height: 380,
  },
  'quiz-game-1': {
    url: 'https://wordwall.net/embed/your-quiz-game-id?themeId=1&templateId=3&fontStackId=0',
    title: 'Quiz Game 1',
    description: 'Test your knowledge with this quiz',
    width: 500,
    height: 380,
  },
  'word-search': {
    url: 'https://wordwall.net/embed/your-word-search-id?themeId=2&templateId=4&fontStackId=0',
    title: 'Word Search',
    description: 'Find the hidden words',
    width: 600,
    height: 450,
  },
  // Add more games here
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
