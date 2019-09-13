var querystring = require('querystring');

module.exports = function (api: any) {
  /**
   * Returns a list of all devices associated with the current user
   * @returns {Promise}
   */
  function list() {
    return api.get('/devices/list', 'device');
  }

  /**
   * Turns a device off
   * @param device either {id: anId} or anId
   * @returns {*} a Promise
   */
  function turnOn(device: any) {
    return api.request('/device/turnOn?' + querystring.stringify({id: device.id || device}));
  }

  /**
   * Turns a device on
   * @param device either {id: anId} or anId
   * @returns {*} a Promise
   */
  function turnOff(device: any) {
    return api.request('/device/turnOff?' + querystring.stringify({id: device.id || device}));
  }

  /**
   * Returns device history
   * @param device either {id: anId} or anId
   * @param from timestamp in seconds
   * @param to timestamp in seconds
   * @returns {*} a Promise
   */
  function history(device: any, from: any, to: any) {
    return api.request('/device/history?' + querystring.stringify({id: device.id || device, from: from, to: to}));
  }

  return {
    list: list,
    turnOn: turnOn,
    turnOff: turnOff,
    history: history
  };
};
