var RSVP = require('rsvp'),
	querystring = require('querystring');

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
		getSensorInfo: function getSensorInfo (sensor) {
			return client.invoke('GET', '/sensor/info?' + querystring.stringify({id: sensor.id}));
		}
	};
};

