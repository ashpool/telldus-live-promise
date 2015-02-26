var RSVP = require('rsvp'),
    querystring = require('querystring'),
    _ = require('lodash');

module.exports = function (client) {
    /**
     * Returns all sensors
     * @returns {RSVP.Promise}
     */
    function getSensors () {
        return new RSVP.Promise(function (resolve, reject) {
            return client.request('GET', '/sensors/list').then(function (result) {
                resolve(result.sensor);
            }, function (reason) {
                reject(reason);
            });
        });
    }

    /**
     * Returns the actual sensor values
     * @param sensor {id: <sensor id>}
     * @returns {RSVP.Promise}}
     */
    function getSensorInfo (sensor) {
        return client.request('GET', '/sensor/info?' + querystring.stringify({id: sensor.id}));
    }

    /**
     * Waits for all calls to getSensorInfo to settle and the return the fulfilled ones.
     * Note that the rejected ones are silently ignored.

     Listing the rejected ones would look something like this:
     _.pluck(_.where(results, {'state': 'rejected'}), 'reason').forEach(function (reason) {
        console.log(reason);
     });

     * @param sensors List of sensors
     * @returns {RSVP.Promise}} Containing a list of sensor infos
     */
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
