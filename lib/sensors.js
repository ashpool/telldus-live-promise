var RSVP = require('rsvp'),
	querystring = require('querystring'),
	_ = require('lodash');

module.exports = function (client, config) {
	var logger = (config && config.logger) || require('./null-logger');
	return {
		getSensors: function getSensors () {
			return new RSVP.Promise(function (resolve, reject) {
				return client.invoke('GET', '/sensors/list').then(function (result) {
					resolve(result.sensor);
				}, function (reason) {
					logger.error(reason);
					reject(reason);
				});
			});
		},
		getSensorInfos: function getSensorInfos (sensors) {
			var self = this;
			var promises = sensors.map(function (sensor) {
				return self.getSensorInfo(sensor);
			});
			console.log('getSensorInfos mapped');
			return RSVP.allSettled(promises).then(function (results) {
				_.pluck(_.where(results, {'state': 'rejected'}), 'reason').forEach(function (reason) {
					logger.warn(reason);
				});
				return _.pluck(_.where(results, {'state': 'fulfilled'}), 'value');
			});
		},
		getSensorInfo: function getSensorInfo (sensor) {
			return client.invoke('GET', '/sensor/info?' + querystring.stringify({id: sensor.id}));
		}
	};
};

