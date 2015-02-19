const TEN_MINUTES_IN_MS = 600000;
var RSVP = require('rsvp'),
	_ = require('lodash');

module.exports = function (telldusAPI, config) {
	var logger = require('log4js-extras')(config).getLogger(__filename);

	// Called when an uncaught error occurs within a promise
	RSVP.on('error', function (reason) {
		logger.debug('uncaught', reason);
	});

	function getSensorInfo (sensor) {
		return new RSVP.Promise(function (resolve, reject) {
			telldusAPI.getSensorInfo(sensor, function (err, sensorInfo) {
				if (!!err) {
					reject(err.message);
				} else {
					if (new Date().getTime() - (sensorInfo.lastUpdated * 1000) > TEN_MINUTES_IN_MS) {
						reject(sensorInfo.clientName + '.' + sensorInfo.name + ' too old ' + new Date(sensorInfo.lastUpdated * 1000));
					} else {
						resolve(sensorInfo);
					}
				}
			});
		});
	}

	function getSensors () {
		return new RSVP.Promise(function (resolve, reject) {
			telldusAPI.getSensors(function (err, sensors) {
				if (!!err) {
					err = err || {};
					reject(err.message || 'failed for unknown reasons');
				} else {
					resolve(sensors);
				}
			});
		});
	}

	function getSensorInfos (sensors) {
		var promises = sensors.map(getSensorInfo);
		return RSVP.allSettled(promises).then(function (results) {
			_.pluck(_.where(results, {'state': 'rejected'}), 'reason').forEach(function (reason) {
				logger.warn(reason);
			});
			return _.pluck(_.where(results, {'state': 'fulfilled'}), 'value');
		});
	}

	return {
		getSensors: getSensors,
		getSensorInfos: getSensorInfos
	};
};
