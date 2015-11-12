var expect = require('expect.js');

describe('APIClient.Factory', function(){

  it('Factory.get', function() {
    var ApiClient = require('../lib/node-api-client');
    expect(ApiClient.Factory.get()).to.be.eql(null);
  });

});
