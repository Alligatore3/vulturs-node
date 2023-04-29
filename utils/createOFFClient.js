const off = require('openfoodfacts-nodejs');

/**
 * Create OFF object
 * @param {Object} options - Options for the OFF Object
 * @param {string} options.country - Country for which you want to call OFF API Client
 */
function createOFFClient() {
  const country = 'it'
  const options = { country }

  return new off(options);
}

module.exports = createOFFClient