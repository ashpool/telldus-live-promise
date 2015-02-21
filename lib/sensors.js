var querystring = require('querystring');

module.exports = function (client) {
	return {
		getSensors: function getSensors () {
			return client.invoke('GET', '/sensors/list');
		},
		getSensorInfo: function getSensorInfo (sensor) {
			return client.invoke('GET', '/sensor/info?' + querystring.stringify({id: sensor.id}));
		}
	}
};
