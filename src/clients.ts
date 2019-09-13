module.exports = function (api: any) {
  /**
   * Returns all clients
   * @returns {Promise}
   */
  function list() {
    return api.get('/clients/list', 'client');
  }

  return {
    list: list
  };
};
