export default class Clients {
  api: any;

constructor(api: any) {
  this.api = api;
}
  /**
   * Returns all clients
   * @returns {Promise}
   */
  list = () => this.api.get('/clients/list', 'client');
};
