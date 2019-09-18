import querystring from 'querystring';

module.exports = function (api: any) {
  /**
   * Returns the actual sensor values
   * @param sensor {id: <sensor id>}
   * @returns {Promise} sensor info
   */
  const info = (sensor: any) => api.request(`/sensor/info?${querystring.stringify({id: sensor.id})}`);

  /**
   * Returns a list of all sensors associated with the current user
   * @param params Set includeValues=1 to include the last value for each sensor
   * @returns {Promise} list of all sensors
   */
  const list = (params: any = { includeValues : 1}) => api.request(`/sensors/list?includeValues=${params.includeValues}`);

  return {
    info: info,
    list: list
  };
};
