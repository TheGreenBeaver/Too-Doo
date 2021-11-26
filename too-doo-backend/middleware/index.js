const { getMeaningfulFiles } = require('../util/misc');
const path = require('path');


/**
 *
 * @param {Object} applyTo
 * @param {Object} options
 * @param {string} options.prefix only apply middleware from files with specified prefix
 * @param {string=} [options.prop = 'use'] `applyTo` method to apply middleware
 * @param {Array<{ prop: string=, path: string= }>=} options.routes only apply middleware for specific routes
 */
function useMiddleware(applyTo, { prefix, prop = 'use', routes } = {}) {
  getMeaningfulFiles(__dirname, __filename)
    .filter(file => file.startsWith(prefix))
    .map(file => require(path.join(__dirname, file)))
    .sort((a, b) => a.order - b.order)
    .forEach(({ stack }) => {
      if (routes) {
        routes.forEach(route => applyTo[route.prop || prop](route.path || route, ...stack))
      } else {
        applyTo[prop](...stack);
      }
    });
}

module.exports = useMiddleware;