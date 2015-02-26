var RSVP = require('rsvp'),
    OAuth = require('oauth');

module.exports = function (config) {
    var expected = {
            GET: [200],
            PUT: [200],
            POST: [200, 201, 202],
            DELETE: [200]
        },
        oauth = new OAuth.OAuth(null, null, config.telldusPublicKey, config.telldusPrivateKey, '1.0', null, 'HMAC-SHA1');

    function _parseResponse (err, body, response, method, resolve, reject) {
        try {
            if (!!err) {
                return reject(err);
            }
            if (expected[method].indexOf(response.statusCode) === -1) {
                throw new Error('Got unexpected response code ' + response.statusCode);
            }
            resolve(JSON.parse(body));
        } catch (ex) {
            return reject(ex);
        }
    }

    /**
     * Performs a secure oauth request to Telldus API.
     * @param method 'GET' | 'PUT' | 'POST' | 'DELETE'
     * @param path
     * @param json
     * @returns {RSVP.Promise}
     */
    function request (method, path, json) {
        return new RSVP.Promise(function (resolve, reject) {
            oauth._performSecureRequest(config.telldusToken,
                config.telldusTokenSecret,
                method,
                'https://api.telldus.com/json' + path,
                null,
                json,
                !!json ? 'application/json' : null, function (err, body, response) {
                    _parseResponse(err, body, response, method, resolve, reject);
                });
        });
    }

    return {
        request: request,
        _parseResponse: _parseResponse
    };
};