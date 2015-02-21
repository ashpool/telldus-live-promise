var RSVP = require('rsvp'),
	OAuth = require('oauth');

module.exports = function (config) {
	var logger = (config && config.logger) || require('./null-logger'),
		oauth = new OAuth.OAuth(null, null, config.telldusPublicKey, config.telldusPrivateKey, '1.0', null, 'HMAC-SHA1');

	return {
		invoke: function invoke (method, path, json) {
			return new RSVP.Promise(function (resolve, reject) {
				oauth._performSecureRequest(config.telldusToken,
					config.telldusTokenSecret,
					method,
					'https://api.telldus.com/json' + path,
					null,
					json,
					!!json ? 'application/json' : null, function (err, body, response) {
						var expected = {
							GET: [200],
							PUT: [200],
							POST: [200, 201, 202],
							DELETE: [200]
						}[method];
						if (!!err) {
							logger.error(err);
							return reject(err);
						}
						var results = {};
						try {
							results = JSON.parse(body);
						} catch (ex) {
							logger.error(ex);
							return reject(ex);
						}
						if (expected.indexOf(response.statusCode) === -1) {
							logger.error(response.statusCode);
							return reject(response.statusCode);
						}
						resolve(results);
					});
			});
		}
	};
};