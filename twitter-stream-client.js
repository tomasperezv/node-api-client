/**
 * @author tom@0x101.com
 * @class TwitterStreamClient
 * @see https://dev.twitter.com/docs/streaming-apis/streams/public
 * @see https://github.com/AvianFlu/ntwitter
 *
 * Base interface for communicating with the Twitter Stream API, adapter for the
 * ntwitter client https://github.com/AvianFlu/ntwitter
 *
 * Public Domain.
 * No warranty expressed or implied. Use at your own risk.
 */
var ApiClient = require('./api-client').ApiClient,
	TwitterClient = require('./twitter-client').TwitterClient,
	ntwitter = require('ntwitter');

var TwitterStreamClient = function(config) {
	this.nTwitter = null;
	this.TYPE_AND = ' ';
	this.TYPE_OR = ',';
	ApiClient.call(this, config);
}

TwitterStreamClient.prototype = new ApiClient();
TwitterStreamClient.prototype._formatFilters = TwitterClient.prototype._formatFilters;

/**
 * Returns and Initialize if needed the ntwitter object.
 * @return {Object} nTwitter
 */
TwitterStreamClient.prototype._getNTwitter = function() {
	if (this.nTwitter === null) {
		this.nTwitter = new ntwitter({
			consumer_key: this.config['twitter-consumer-key'],
			consumer_secret: this.config['twitter-consumer-secret'],
			access_token_key: this.config['twitter-access-token'],
			access_token_secret: this.config['twitter-access-token-secret']
		});
	}
	return this.nTwitter;
};

/**
 * @see https://dev.twitter.com/docs/api/1/post/statuses/filter
 * @param {Object} filters
 * @param {Function} callback
 */
TwitterStreamClient.prototype.search = function(filters, callback) {
	var params = {
		track: this._formatFilters(filters)
		locations: '-180,-90,180,90'
	};
	console.log(params);
	var nTwitter = this._getNTwitter(),
		self = this;

	nTwitter.stream('statuses/filter', params, function(stream) {
		var output = [];

		stream.on('data', function (chunk) {
			console.log(chunk.text);
			output.push(chunk);
		});

		stream.on('destroy', function (response) {
			console.log('Returning ' + output.length + ' results');
			callback(JSON.stringify(output));
		});

		stream.on('error', function (response) {
		});

		// Disconnect stream after max time
		setTimeout(stream.destroy, self.config['twitter-stream-time']);
	});

};

// Expose the TwitterStreamClient object
exports.TwitterStreamClient = TwitterStreamClient;
