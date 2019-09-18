import API from "./api";

export default class Clients {
  api: API;

constructor(api: API) {
  this.api = api;
}
  /**
   * Returns all clients
   * @returns {Promise}
   */
  list = () => this.api.get('/clients/list', 'client');
};
