var expect = require('expect.js');

describe('HttpApiClient', function(){

  it('Instantiation and callMethod', function(done) {
    var HttpApiClient = require('../lib/core/http-api-client');
    var client = new HttpApiClient();
    client.callMethod('test', {}, function(result) {
      expect(result).to.be.an('object');
      expect(result).to.eql({});
      done();
    });
  });

});
