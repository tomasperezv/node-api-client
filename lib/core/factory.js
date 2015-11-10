/* jslint node: true */

/**
 * Factory that return an API client
 * e.g. To instantiate an Twitter search client:
 *    var twitterSearchClient = ApiClientFactory.get(ApiClient.Type.TWITTER_SEARCH);
 *
 * @class Factory
 */
var Factory = {

  /**
   * Factory method that instantiate Api client objects.
   *
   * @method get
   * @return {ApiClient|null}
   * @public
   */
  get: function(type, config) {

    var Type = require('./type');
    var apiClient = null;

    switch(type) {

      case Type.TWITTER_SEARCH:
        var TwitterSearchClient = require('./twitter-search-client');
        apiClient = new TwitterSearchClient(config);
        break;

      case Type.TWITTER_STREAM:
        var TwitterStreamClient = require('./twitter-stream-client');
        apiClient = new TwitterStreamClient(config);
        break;

    }

    return apiClient;
  }
};

module.exports = Factory;
