module.exports = (api: any) => {
  /**
   * Returns all clients
   * @returns {Promise}
   */
  const list = () => api.get('/clients/list', 'client');

  return {
    list: list
  };
};
