module.exports = function (api) {
    /**
     * Returns all clients
     * @returns {RSVP.Promise}
     */
    function getClients () {
        return api.get('/clients/list', 'client');
    }

    return {
        getClients: getClients
    };
};