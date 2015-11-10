var expect = require('expect.js');

describe('APIClient', function(){

  it('Initialization and base object', function(done) {
    var ApiClient = require('../lib/api-client').ApiClient;

    var apiClient = new ApiClient();
    apiClient.callMethod('test', {}, function(result) {
      expect(result).to.be.an('object');
      expect(result).to.eql({});
      done();
    });
  });

});

describe('APIClient.Types', function(){

  it('API.Types are defined', function() {
    var Types = require('../lib/api-client').Types;
    expect(Types).to.be.an('object');
    for (var type in Types) { // jshint ignore:line
      expect(type).to.be.an('string');
    }
  });

});
