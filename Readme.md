node-api-client
=============
Node.js client for public API's: Twitter Search, Twitter Stream, Google Predicion API, ..

Author
----------
Tomas Perez - tom@0x101.com

http://www.tomasperez.com

Examples
----------

	// Twitter search API
	var twitterSearchClient = ApiClientFactory.get(ApiClient.types.TWITTER_SEARCH);
	twitterSearchClient.search({maxTweets: 2, filters: 'test node'}, function(result) {
		// Succesful request
		console.log(result);
	});

License
-----------
Public Domain.

No warranty expressed or implied. Use at your own risk.
