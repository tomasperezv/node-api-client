/**
 * @author tom@0x101.com
 * @class TwitterSearchClient
 * @see https://dev.twitter.com/docs/using-search
 *
 * Base interface for communicating with the Twitter Search API.
 *
 * Public Domain.
 * No warranty expressed or implied. Use at your own risk.
 */
var HttpApiClient = require('./http-api-client').HttpApiClient,
	querystring = require('querystring');

var TwitterSearchClient = function() {
	var config = {
		port: 80,
		host: 'search.twitter.com'
	};
	HttpApiClient.call(this, config);
	/**
	 * Used to compose the filters query string
	 */
	this.AND = ' AND ';
	this.OR = ' OR ';
}

TwitterSearchClient.prototype = new HttpApiClient();

/**
 * @param {Object} filters
 * @return {String} filters urlencoded
 */
TwitterSearchClient.prototype._formatFilters = function(filters) {
	return querystring.stringify({'q': filters['data'].join(filters['type'])});
};

/**
 * Build the path expected by the HttpApiClient to build the request.
 * @param {Object} params
 * @return {String}
 */
TwitterSearchClient.prototype._buildPath = function(params) {
	var type = this.AND;
	if (params.type_and == 'false') {
		type = this.OR;
	}
	var filters = {
		'data': params.filters.split(' '),
		'type': type
	};

	if (typeof params.page === 'undefined') {
		params.page = 1;
	}
	return '/search.json?' + this._formatFilters(filters) + '&rpp=' + params.maxTweets + '&page=' + params.page;
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
