var RSVP = require('rsvp'),
	querystring = require('querystring'),
	_ = require('lodash');

module.exports = function (client) {
	return {
		getSensors: function getSensors () {
			return new RSVP.Promise(function (resolve, reject) {
				return client.invoke('GET', '/sensors/list').then(function (result) {
					resolve(result.sensor);
				}, function (reason) {
					reject(reason);
				});
			});
		},
		getSensorInfos: function getSensorInfos (sensors) {
			var promises = sensors.map(getSensorInfo);
			return RSVP.allSettled(promises).then(function (results) {
				_.pluck(_.where(results, {'state': 'rejected'}), 'reason').forEach(function (reason) {
					logger.warn(reason);
				});
				return _.pluck(_.where(results, {'state': 'fulfilled'}), 'value');
			});
		},
		getSensorInfo: function getSensorInfo (sensor) {
			console.log(sensor);
			return client.invoke('GET', '/sensor/info?' + querystring.stringify({id: sensor.id}));
		}
	};
};

