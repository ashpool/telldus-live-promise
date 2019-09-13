var OAuth = require('oauth');

module.exports = function (config: any) {
  var oauth = new OAuth.OAuth(null, null, config.telldusPublicKey, config.telldusPrivateKey, '1.0', null, 'HMAC-SHA1');

  function _parseResponse(err: any, body: any, response: any, resolve: any, reject: any) {
    try {
      if (!!err) {
        return reject(err);
      }
      if (response.statusCode !== 200) {
        reject(new Error('Got unexpected response code ' + response.statusCode));
      } else {
        resolve(JSON.parse(body));
      }
    } catch (ex) {
      return reject(ex);
    }
  }

  /**
   * Performs a secure oauth request to Telldus API.
   * @param path
   * @param json optional
   * @returns {Promise}
   */
  function request(path: any, json: any) {
    return new Promise(function (resolve, reject) {
      oauth._performSecureRequest(config.telldusToken,
        config.telldusTokenSecret,
        'GET',
        'https://api.telldus.com/json' + path,
        null,
        json,
        !!json ? 'application/json' : null, function (err: any, body: any, response: any) {
          _parseResponse(err, body, response, resolve, reject);
        });
    });
  }

  function get(path: any, key: any) {
    return new Promise(function (resolve, reject) {
      // @ts-ignore
      return request(path).then(function (result: any) {
        return resolve(result[key]);
      }, function (reason: any) {
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
