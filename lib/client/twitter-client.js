/* jslint node: true */

/**
 * @class TwitterClient
 *
 * Base functionality for the twitter clients.
 */
var TwitterClient = function(config) {
  /**
   * @type {Object} {_config}
   * @private
   */
  this._config = config;
};

/**
 * @param {Object} params
 * @return {String} filters urlencoded
 */
TwitterClient.prototype._formatFilters = function(params) {
  var type = this.TYPE_AND;
  if (typeof params.type_and === 'undefined' || !params.type_and) {
    type = this.TYPE_OR;
  }
  var data = params.filters.split(' ');
  return data.join(type);
};

// Expose the TwitterClient
module.exports = TwitterClient;
