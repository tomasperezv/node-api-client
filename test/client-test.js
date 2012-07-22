/**
 * Node.js client application for test the connectivity with
 * the external API's.
 *
 * @author tom@0x101.com
 * @see https://github.com/tomasperezv/node-api-client
 *
 * Public Domain.
 * No warranty expressed or implied. Use at your own risk.
 */

// Test the twitter stream API client
var ApiClientFactory = require('../api-client').ApiClientFactory,
	ApiClientTypes = require('../api-client').Types,
	ApiClient = require('../api-client').ApiClient;

var mockConfig = {
	"twitter-max-tweets": 1,
	"twitter-consumer-key" : "",
	"twitter-consumer-secret": "",
	"twitter-access-token": "",
	"twitter-access-token-secret": "",
	"twitter-stream-time": 10000
};

var params = {
	'filters':'node',
	'type_and':true
};

console.log('Twitter stream API');
var twitterStreamClient = ApiClientFactory.get(ApiClientTypes.TWITTER_STREAM, mockConfig);
twitterStreamClient.search(params, function(result) {
	console.log(result.text);
});

// Test the twitter search API
console.log('Twitter search API');
var twitterSearchClient = ApiClientFactory.get(ApiClientTypes.TWITTER_SEARCH);
twitterSearchClient.search({maxTweets: 2, filters: 'test twitter'}, function(result) {
	console.log(result);
});
