var RSVP = require('rsvp'),
	OAuth = require('oauth');

module.exports = function (config) {
	var oauth = new OAuth.OAuth(null, null, config.telldusPublicKey, config.telldusPrivateKey, '1.0', null, 'HMAC-SHA1');

	invoke: function invoke (method, path, json) {
		return new RSVP.Promise(function (resolve, reject) {
			oauth._performSecureRequest(config.telldusToken, config.telldusTokenSecret, method, 'https://api.telldus.com/json' + path, null, json,
				!!json ? 'application/json' : null, function (err, body, response) {
					var expected = {
						GET: [200]
						, PUT: [200]
						, POST: [200, 201, 202]
						, DELETE: [200]
					}[method];
					if (!!err) {
						return reject(err);
					}
					var results = {};
					try {
						results = JSON.parse(body);
					} catch (ex) {
						return reject(ex);
					}
					if (expected.indexOf(response.statusCode) === -1) {
						return reject(response.statusCode);
					}
					resolve(results);
				});
		});
	}
};
