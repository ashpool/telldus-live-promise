import querystring from 'querystring';
import Telldus from "./telldus";
import {Sensor} from "./types";

export default class Sensors {
  api: Telldus;

  constructor(api: Telldus) {
    this.api = api;
  }
  /**
   * Returns the actual sensor values
   * @param sensor {id: <sensor id>}
   * @returns {Promise} sensor info
   */
  info = (sensor: Sensor) => this.api.request(`/sensor/info?${querystring.stringify({id: sensor.id})}`);

  /**
   * Returns a list of all sensors associated with the current user
   * @param params Set includeValues=1 to include the last value for each sensor
   * @returns {Promise} list of all sensors
   */
  list = (params: any = { includeValues : 1}): Promise<Sensor[]> => this.api.request(`/sensors/list?includeValues=${params.includeValues}`);
};
