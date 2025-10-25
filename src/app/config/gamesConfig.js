/**
 * Game Configuration
 * Maps friendly game identifiers to Wordwall embed URLs
 * This keeps URLs hidden from the client and provides a clean API
 *
 * 🎯 TO REMOVE WORDWALL BANNER:
 * 1. Subscribe to Wordwall Premium: https://wordwall.net/pricing
 * 2. Get premium embed URLs from your Wordwall dashboard:
 *    - Open your activity → Click "Share" → Select "Embed"
 *    - Enable "Remove branding" or "Ad-free" option (Premium only)
 *    - Copy the new embed URL
 * 3. Add premium URL parameter: &premiumEmbed=1 (or similar)
 * 4. See HOW_TO_GET_PREMIUM_EMBED.md for detailed guide
 *
 * Common Premium URL Patterns:
 * - &premiumEmbed=1
 * - &noBranding=1
 * - &premium=1
 * - &adFree=1
 */

export const gamesConfig = {
  'matching-game-1': {
    // FREE EMBED (with banner)
    url: 'https://wordwall.net/embed/4170af7a0b134f80ba77aa6260dd48f2?themeId=3&templateId=5&fontStackId=0',
    title: 'Matching Game 1',
    description: 'A fun matching game for learning',
    width: 500,
    height: 380,
  },
  'matching-game-test': {
    // PREMIUM EMBED (no banner) - has &premiumEmbed=1
    url: 'https://wordwall.net/ar/embed/d4ad152cc47f4e76a949581e6718e0b3?themeId=65&templateId=25&fontStackId=0&premiumEmbed=1&premium=1&noBranding=1&adFree=1',
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
