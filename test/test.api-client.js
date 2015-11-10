var expect = require('expect.js');

describe('APIClient.Client', function(){

  it('Initialization and base object', function(done) {
    var ApiClient = require('../lib/node-api-client');

    var client = new ApiClient.Client();
    client.callMethod('test', {}, function(result) {
      expect(result).to.be.an('object');
      expect(result).to.eql({});
      done();
    });
  });

});

describe('APIClient.Type', function(){

  it('API.Type are defined', function() {
    var ApiClient = require('../lib/node-api-client');
    expect(ApiClient.Type).to.be.an('object');
    for (var type in ApiClient.Type) { // jshint ignore:line
      expect(type).to.be.an('string');
    }
  });

});
