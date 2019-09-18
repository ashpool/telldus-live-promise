import Telldus from "./telldus";

export default class Clients {
  api: Telldus;

constructor(api: Telldus) {
  this.api = api;
}
  /**
   * Returns all clients
   * @returns {Promise}
   */
  list = () => this.api.get('/clients/list', 'client');
};
