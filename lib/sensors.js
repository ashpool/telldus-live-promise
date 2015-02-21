var RSVP = require('rsvp'),
	querystring = require('querystring'),
	_ = require('lodash');

module.exports = function (client) {
	return {
		getSensors: function getSensors () {
			console.log('getSensors');
			return new RSVP.Promise(function (resolve, reject) {
				return client.invoke('GET', '/sensors/list').then(function (result) {
					resolve(result.sensor);
				}, function (reason) {
					console.log(reason);
					reject(reason);
				});
			});
		},
		getSensorInfos: function getSensorInfos (sensors) {
			console.log('getSensorInfos');
			var promises = sensors.map(function (sensor) {
				console.log('getSensorInfo');
				return client.invoke('GET', '/sensor/info?' + querystring.stringify({id: sensor.id}));
			});
			console.log('getSensorInfos mapped');
			return RSVP.allSettled(promises).then(function (results) {
				console.log('getSensorInfos plucking');
				_.pluck(_.where(results, {'state': 'rejected'}), 'reason').forEach(function (reason) {
					logger.warn(reason);
				});
				return _.pluck(_.where(results, {'state': 'fulfilled'}), 'value');
			});
		},
		getSensorInfo: function getSensorInfo (sensor) {
			console.log('getSensorInfo');
			return client.invoke('GET', '/sensor/info?' + querystring.stringify({id: sensor.id}));
		}
	};
};

