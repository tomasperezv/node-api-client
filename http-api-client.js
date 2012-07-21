/**
 * @author tom@0x101.com
 * @class HttpApiClient
 *
 * Base interface for communicating with HTTP API's
 *
 * Public Domain.
 * No warranty expressed or implied. Use at your own risk.
 */
var ApiClient = require('./api-client').ApiClient,
	http = require('http');

var HttpApiClient = function(config) {
	ApiClient.call(this, config);
}

HttpApiClient.prototype = new ApiClient();

/**
 * @param {Object} params
 * @return {Object}
 */
HttpApiClient.prototype._buildOptions = function(params) {
	var options = this.config;
	options.path = this._buildPath(params);
	return options;
};

/**
 * Build the path expected by the HttpApiClient to build the request.
 * @param {Object} params
 * @return {String}
 */
HttpApiClient.prototype._buildPath = function(params) {
	return '';
};

/**
 * @param {Object} options
 * 		options.host {String}
 * 		options.port {Integer}
 * 		options.path {String}
 * @param {Function} callback
 */
HttpApiClient.prototype.request = function(params, callback) {
	var options = this._buildOptions(params);
	console.log('Asking to the Twitter Search API: ' + options.path);
	var req = http.request(options, function(res) {
		var output = '';
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			output += chunk;
		});

		res.on('end', function() {
			callback(output, res.statusCode);
		});
	});

	req.on('error', function(e) {
		console.log(e.message);
	});
	
	req.end();
};

// Expose the HttpApiClient object
exports.HttpApiClient = HttpApiClient;
