/* jslint node: true */

/**
 * @class TwitterSearchClient
 * @see https://dev.twitter.com/docs/using-search
 *
 * Base interface for communicating with the Twitter Search API.
 */
var HttpApiClient = require('../core/http-api-client'),
  querystring = require('querystring'),
  TwitterClient = require('./twitter-client');

var TwitterSearchClient = function() {
  var config = {
    port: 80,
    host: 'search.twitter.com'
  };
  this.TYPE_AND = ' AND ';
  this.TYPE_OR = ' OR ';
  HttpApiClient.call(this, config);
};

TwitterSearchClient.prototype = new HttpApiClient();

TwitterSearchClient.prototype._formatFilters = TwitterClient.prototype._formatFilters;

/**
 * Build the path expected by the HttpApiClient to build the request.
 * @param {Object} params
 * @return {String}
 */
TwitterSearchClient.prototype._buildPath = function(params) {
  if (typeof params.page === 'undefined') {
    params.page = 1;
  }
  var query = querystring.stringify({'q': this._formatFilters(params)});
  return '/search.json?q=' + query + '&rpp=' + params.maxTweets + '&page=' + params.page;
};

/**
 * Return tweets based on the filters, asking to the Twitter Search API.
 * @see https://dev.twitter.com/docs/api/1/get/search
 * @param {Function} callback
 * @param {Object} filters
 */
TwitterSearchClient.prototype.search = function(params, callback) {
  this.request(params, function(output, statusCode) {
    console.log('Successful request to Twitter Search API:' + statusCode + ' ' + output.length + ' bytes');
    callback(output);
  });
};

// Expose the TwitterSearcClient
exports.TwitterSearchClient = TwitterSearchClient;
