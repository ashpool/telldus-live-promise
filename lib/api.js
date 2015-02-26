var RSVP = require('rsvp'),
    OAuth = require('oauth');

module.exports = function (config) {
    var oauth = new OAuth.OAuth(null, null, config.telldusPublicKey, config.telldusPrivateKey, '1.0', null, 'HMAC-SHA1');

    function _parseResponse (err, body, response, resolve, reject) {
        try {
            if (!!err) {
                return reject(err);
            }
            if (response.statusCode !== 200) {
                throw new Error('Got unexpected response code ' + response.statusCode);
            }
            resolve(JSON.parse(body));
        } catch (ex) {
            return reject(ex);
        }
    }

    /**
     * Performs a secure oauth request to Telldus API.
     * @param path
     * @param json optional
     * @returns {RSVP.Promise}
     */
    function request (path, json) {
        return new RSVP.Promise(function (resolve, reject) {
            oauth._performSecureRequest(config.telldusToken,
                config.telldusTokenSecret,
                'GET',
                'https://api.telldus.com/json' + path,
                null,
                json,
                !!json ? 'application/json' : null, function (err, body, response) {
                    _parseResponse(err, body, response, resolve, reject);
                });
        });
    }

    function get (path, key) {
        return new RSVP.Promise(function (resolve, reject) {
            return request(path).then(function (result) {
                resolve(result[key]);
            }, function (reason) {
                reject(reason);
            });
        });
    }

    return {
        get: get,
        request: request,
        _parseResponse: _parseResponse
    };
};