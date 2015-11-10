/* jslint node: true */

/**
 * @class TwitterStreamClient
 * @see https://dev.twitter.com/docs/streaming-apis/streams/public
 * @see https://www.npmjs.com/package/twitter
 *
 * Base interface for communicating with the Twitter Stream API, adapter for the
 * node.js twitter client https://github.com/desmondmorris/node-twitter
 */
var TwitterClient = require('./twitter-client');

/**
 * @param {Object} config
 * @constructor
 */
var TwitterStreamClient = function(config) {
  this.nodeTwitter = null;
  this.TYPE_AND = ' ';
  this.TYPE_OR = ',';
  TwitterClient.call(this, config);
};

TwitterStreamClient.prototype = new TwitterClient();

/**
 * Returns and Initialize if needed the nodeTwitter object.
 * @return {Object} nodeTwitter
 */
TwitterStreamClient.prototype._getnodeTwitter = function() {
  if (this.nodeTwitter === null) {
    var Twitter = require('twitter');
    this.nodeTwitter = new Twitter({
      consumer_key: this._config['twitter-consumer-key'],
      consumer_secret: this._config['twitter-consumer-secret'],
      access_token_key: this._config['twitter-access-token'],
      access_token_secret: this._config['twitter-access-token-secret']
    });
  }
  return this.nodeTwitter;
};

/**
 * @see https://dev.twitter.com/docs/api/1/post/statuses/filter
 * @param {Object} filters
 * @param {Function} callback
 */
TwitterStreamClient.prototype.search = function(filters, callback) {
  var params = {
    track: this._formatFilters(filters),
    locations: '-180,-90,180,90'
  };

  var nodeTwitter = this._getnodeTwitter(),
    self = this;

  var maxTweets = self._config['twitter-max-tweets'];

  nodeTwitter.stream('statuses/filter', params, function(stream) {
    var tweets = [];

    stream.on('data', function (tweet) {
      tweets.push(tweet.text);

      if (tweets.length === maxTweets) {
        callback(tweets);
      }
    });

    stream.on('end', function() {
      if (tweets.length < maxTweets) {
        callback(false, tweets);
      }
    });

    stream.on('error', function(error) {
      console.log(error);
      callback(error, tweets);
    });

    // Disconnect stream after max time
    setTimeout(stream.destroy, self._config['twitter-stream-time']);
  });

};

// Expose the TwitterStreamClient object
module.exports = TwitterStreamClient;
