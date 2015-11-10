/* jslint node: true */

/**
 * Base interface for communicating with an API, the
 * different clients extend this object.
 *
 * @class Client
 */

/**
 * @param {Object} config
 *  config.host {String}
 *  config.port {Integer}
 */
var Client = function(config) {
  this.config = config;
};

/**
 * @param {String} method
 * @param {Object} params
 * @param {Function} callback
 */
Client.prototype.callMethod = function(method, params, callback) {
  // Base method, nothing to do.
  callback({});
};

// Expose the Client object
module.exports = Client;
