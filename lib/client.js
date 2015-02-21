var TelldusAPI = require('telldus-live');

module.exports = function (config) {
	return new TelldusAPI.TelldusAPI({
		publicKey: config.telldusPublicKey,
		privateKey: config.telldusPrivateKey
	}).login(config.telldusToken, config.telldusTokenSecret, function (err) {
			if (!!err) {
				throw err;
			}
		}).on('error', function (err) {
			throw err.message;
		});
};
