var RSVP = require('rsvp'),
    querystring = require('querystring');

module.exports = function (client) {
    /**
     * Returns a list of all devices associated with the current user
     * @returns {RSVP.Promise}
     */
    function getDevices () {
        return new RSVP.Promise(function (resolve, reject) {
            return client.request('GET', '/devices/list').then(function (result) {
                resolve(result.device);
            }, function (reason) {
                reject(reason);
            });
        });
    }

    /**
     * Turns a device off
     * @param device either {id: anId} or anId
     * @returns {*} a Promise
     */
    function turnOn (device) {
        return client.request('GET', '/device/turnOn?' + querystring.stringify({id: device.id || device}));
    }

    /**
     * Turns a device on
     * @param device either {id: anId} or anId
     * @returns {*} a Promise
     */
    function turnOff (device) {
        return client.request('GET', '/device/turnOff?' + querystring.stringify({id: device.id || device}));
    }

    return {
        getDevices: getDevices,
        turnOn: turnOn,
        turnOff: turnOff
    };
};
