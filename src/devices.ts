import querystring from 'querystring';
import Telldus from "./telldus";

export default class Devices {
  api: Telldus;

  constructor (api: Telldus) {
    this.api = api;
  }

  /**
   * Returns a list of all devices associated with the current user
   * @returns {Promise}
   */
  list = () => this.api.get('/devices/list', 'device');

  /**
   * Turns a device off
   * @param device either {id: anId} or anId
   * @returns {*} a Promise
   */
  turnOn = (device: any) => this.api.request('/device/turnOn?' + querystring.stringify({id: device.id || device}));

  /**
   * Turns a device on
   * @param device either {id: anId} or anId
   * @returns {*} a Promise
   */
  turnOff = (device: any) => this.api.request('/device/turnOff?' + querystring.stringify({id: device.id || device}));

  /**
   * Returns device history
   * @param device either {id: anId} or anId
   * @param from timestamp in seconds
   * @param to timestamp in seconds
   * @returns {*} a Promise
   */
  history = (device: any, from: any, to: any) => this.api.request('/device/history?' + querystring.stringify({id: device.id || device, from: from, to: to}));
};
