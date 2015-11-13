var expect = require('expect.js');

describe('APIClient.Factory', function(){

  it('Factory.get with invalid object', function() {
    var ApiClient = require('../lib/node-api-client');
    expect(ApiClient.Factory.get()).to.be.eql(null);
  });

  it('Factory.get with valid object', function() {
    var ApiClient = require('../lib/node-api-client');
    expect(ApiClient.Factory.get('twitter_stream')).to.not.be.eql(null);
  });

});
