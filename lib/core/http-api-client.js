/* jslint node: true */

/**
 * @class HttpApiClient
 *
 * Base interface for communicating with HTTP API's
  */
var ApiClient = require('./client'),
  http = require('http');

var HttpApiClient = function(config) {
  ApiClient.call(this, config);
  this._baseUrl = '';
};

HttpApiClient.prototype = new ApiClient();

/**
 * @method _buildOptions
 * @param {Object} params
 * @return {Object}
 * @private
 */
HttpApiClient.prototype._buildOptions = function(params) {
  var options = this.config;
  options.path = this._buildPath(params);
  return options;
};

/**
 * Build the path expected by the HttpApiClient to build the request.
 * @method _buildPath
 * @param {Object} parameters
 * @private
 * @return {String}
 */
HttpApiClient.prototype._buildPath = function(parameters) {

  var params = [];
  var addParams = function(paramsMap) {
    for (var paramKey in paramsMap) {
      if (paramsMap.hasOwnProperty(paramKey)) {
        params.push(encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramsMap[paramKey]));
      }
    }
  };

  addParams(parameters);

  return this._baseUrl + '?' + params.join('&');
};

/**
 * @param {Object} options
 *    options.host {String}
 *    options.port {Integer}
 *    options.path {String}
 * @param {Function} callback
 * @public
 * @method request
 */
HttpApiClient.prototype.request = function(params, callback) {
  var options = this._buildOptions(params);
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
module.exports = HttpApiClient;
