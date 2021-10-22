var querystring = require('querystring');

module.exports = (api: any) => {
  /**
   * Returns a list of all devices associated with the current user
   * @returns {Promise}
   */
  const list = () => api.get('/devices/list', 'device');

  /**
   * Turns a device off
   * @param device either {id: anId} or anId
   * @returns {*} a Promise
   */
  const turnOn = (device: any) => api.request('/device/turnOn?' + querystring.stringify({id: device.id || device}));

  /**
   * Turns a device on
   * @param device either {id: anId} or anId
   * @returns {*} a Promise
   */
  const turnOff = (device: any) => api.request('/device/turnOff?' + querystring.stringify({id: device.id || device}));

  /**
   * Returns device history
   * @param device either {id: anId} or anId
   * @param from timestamp in seconds
   * @param to timestamp in seconds
   * @returns {*} a Promise
   */
  const history = (device: any, from: any, to: any) => api.request('/device/history?' + querystring.stringify({id: device.id || device, from: from, to: to}));

  return {
    list: list,
    turnOn: turnOn,
    turnOff: turnOff,
    history: history
  };
};
