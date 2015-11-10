/* jslint node: true */

/**
 * @author tom@0x101.com
 * @class ApiClient.Client
 *
 * Base interface for communicating with an API.
 *
 * Public Domain.
 * No warranty expressed or implied. Use at your own risk.
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
exports.Client = Client;

/**
 * Store the constants that define the supported API clients.
 * @var {Object} Type
 */
var Type = {
  TWITTER_SEARCH: 'twitter_search',
  TWITTER_STREAM: 'twitter_stream',
  GOOGLE_PREDICTION: 'google_prediction'
};

exports.Type = Type;

/**
 * Simple factory that return an API client
 * e.g. To instantiate an Twitter search client:
 *    var twitterSearchClient = ApiClientFactory.get(ApiClient.Type.TWITTER_SEARCH);
 */
var Factory = {
  get: function(type, config) {
    var apiClient = null;
    switch(type) {

      case Type.TWITTER_SEARCH:
        var TwitterSearchClient = require('./twitter-search-client').TwitterSearchClient;
        apiClient = new TwitterSearchClient(config);
        break;

      case Type.TWITTER_STREAM:
        var TwitterStreamClient = require('./twitter-stream-client').TwitterStreamClient;
        apiClient = new TwitterStreamClient(config);
        break;

    }
    return apiClient;
  }
};

// Expose the ApiClientFactory object
exports.Factory = Factory;
