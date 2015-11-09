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
