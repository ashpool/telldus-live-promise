var RSVP = require('rsvp'),
    querystring = require('querystring'),
    _ = require('lodash');

module.exports = function (client) {

    function getSensors () {
        return new RSVP.Promise(function (resolve, reject) {
            return client.request('GET', '/sensors/list').then(function (result) {
                resolve(result.sensor);
            }, function (reason) {
                reject(reason);
            });
        });
    }

    function getSensorInfo (sensor) {
        return client.request('GET', '/sensor/info?' + querystring.stringify({id: sensor.id}));
    }

    function getSensorInfos (sensors) {
        var promises = sensors.map(function (sensor) {
            return getSensorInfo(sensor);
        });
        return RSVP.allSettled(promises).then(function (results) {
            return _.pluck(_.where(results, {state: 'fulfilled'}), 'value');
        });
    }

    return {
        getSensors: getSensors,
        getSensorInfo: getSensorInfo,
        getSensorInfos: getSensorInfos
    };
};
