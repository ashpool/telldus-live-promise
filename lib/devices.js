var querystring = require('querystring');

module.exports = function (api) {
    /**
     * Returns a list of all devices associated with the current user
     * @returns {RSVP.Promise}
     */
    function getDevices () {
        return api.get('/devices/list', 'device');
    }

    /**
     * Turns a device off
     * @param device either {id: anId} or anId
     * @returns {*} a Promise
     */
    function turnOn (device) {
        return api.request('/device/turnOn?' + querystring.stringify({id: device.id || device}));
    }

    /**
     * Turns a device on
     * @param device either {id: anId} or anId
     * @returns {*} a Promise
     */
    function turnOff (device) {
        return api.request('/device/turnOff?' + querystring.stringify({id: device.id || device}));
    }

    return {
        getDevices: getDevices,
        turnOn: turnOn,
        turnOff: turnOff
    };
};
