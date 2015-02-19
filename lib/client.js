var TelldusAPI = require('telldus-live');

module.exports = {
	Client: function (config) {
		var logger = require('log4js-extras')(config).getLogger(__filename);
		return new TelldusAPI.TelldusAPI({
			publicKey: config.telldusPublicKey,
			privateKey: config.telldusPrivateKey
		}).login(config.telldusToken, config.telldusTokenSecret, function (err, user) {
				if (!!err) {
					return logger.error('login error: ', err.data);
				}
				logger.info('user: ', user);
			}).on('error', function (err) {
				logger.error('background error: ', err.message);
			});
	}
};
