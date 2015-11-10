/* jslint node: true */

/**
 * Interface that exposes the different public objects that compose the
 * node-api-client library.
 */
module.exports = {
  Factory: require('./core/factory'),
  Type: require('./core/type'),
  Client: require('./core/client')
};
