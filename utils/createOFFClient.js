import * as off from 'openfoodfacts-nodejs';

/**
 * Create OFF object
 * @param {Object} options - Options for the OFF Object
 * @param {string} options.country - Country for which you want to call OFF API Client
 */
export function createOFFClient() {
  const country = 'it'
  const options = { country }

  return new off.default(options);
}
