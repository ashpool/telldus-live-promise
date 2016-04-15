var querystring = require('querystring');

module.exports = function (api) {
  /**
   * Returns the actual sensor values
   * @param sensor {id: <sensor id>}
   * @returns {Promise} sensor info
   */
  function info(sensor) {
    return api.request('/sensor/info?' + querystring.stringify({id: sensor.id}));
  }

  /**
   * Returns a list of all sensors associated with the current user
   * @param params Set includeValues=1 to include the last value for each sensor
   * @returns {Promise} list of all sensors
   */
  function list(params) {
    params = params || {includeValues: 1};
    return api.request('/sensors/list?includeValues=' + params.includeValues);
  }

  return {
    info: info,
    list: list
  };
};
