var RSVP = require('rsvp'),
	querystring = require('querystring');

module.exports = function (client) {
	return {
		getSensors: function getSensors () {
			return client.invoke('GET', '/sensors/list');
		},
		getSensorInfo: function getSensorInfo (sensor) {
			return new RSVP.Promise(function (resolve, reject) {
				client.invoke('GET', '/sensor/info?' + querystring.stringify({id: sensor.id})).then(function (result) {
					resolve(result.sensor);
				}, function (reason) {
					reject(reason);
				});
			});
		}
	}
};
