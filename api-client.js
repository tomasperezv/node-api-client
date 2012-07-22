/**
 * @author tom@0x101.com
 * @class ApiClient
 *
 * Base interface for communicating with an API.
 *
 * Public Domain.
 * No warranty expressed or implied. Use at your own risk.
 */

/**
 * @param {Object} config
 * config.host {String}
 * config.port {Integer}
 */
var ApiClient = function(config) {
	this.config = config;
};

ApiClient.prototype = {
	/**
	 * @param {Object} params
	 * @param {Function} callback
	 */
	callMethod: function(method, params, callback) {
		// Base method, nothing to do.
		callback({});
	},
};

// Expose the ApiClient object
exports.ApiClient = ApiClient;

/**
 * Store the constants that define the supported API clients.
 * @var {Object} types
 */
var Types = {
	TWITTER_SEARCH: 'twitter_search',
	TWITTER_STREAM: 'twitter_stream',
	GOOGLE_PREDICTION: 'google_prediction'
};

exports.Types = Types;

/**
 * Simple factory that return an API client
 * e.g. To instantiate an Twitter search client:
 * 		var twitterSearchClient = ApiClientFactory.get(ApiClient.types.TWITTER_SEARCH);
 */
var ApiClientFactory = {
	get: function(type, config) {
		var apiClient = null;
		switch(type) {
			case Types.TWITTER_SEARCH:
				var TwitterSearchClient = require('./twitter-search-client').TwitterSearchClient;
				apiClient = new TwitterSearchClient(config);
				break;
			case Types.TWITTER_STREAM:
				var TwitterStreamClient = require('./twitter-stream-client').TwitterStreamClient;
				apiClient = new TwitterStreamClient(config);
				break;
		}
		return apiClient;
	}
};

// Expose the ApiClientFactory object
exports.ApiClientFactory = ApiClientFactory;
