import querystring from 'querystring';
import API from "./api";

export default class Sensors {
  api: API;

  constructor(api: API) {
    this.api = api;
  }
  /**
   * Returns the actual sensor values
   * @param sensor {id: <sensor id>}
   * @returns {Promise} sensor info
   */
  info = (sensor: any) => this.api.request(`/sensor/info?${querystring.stringify({id: sensor.id})}`);

  /**
   * Returns a list of all sensors associated with the current user
   * @param params Set includeValues=1 to include the last value for each sensor
   * @returns {Promise} list of all sensors
   */
  list = (params: any = { includeValues : 1}) => this.api.request(`/sensors/list?includeValues=${params.includeValues}`);
};
