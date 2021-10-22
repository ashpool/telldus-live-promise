import {ServerResponse} from "http";
import OAuth from 'oauth';

module.exports = (config: any) => {
  const oauth = new OAuth.OAuth('https://api.telldus.com/oauth/requestToken', 'https://api.telldus.com/oauth/authorize', config.telldusPublicKey, config.telldusPrivateKey, '1.0', null, 'HMAC-SHA1');

  const _parseResponse = (err: Error | undefined, body: any, response: ServerResponse, resolve: Function, reject: Function) => {
    try {
      if (!!err) {
        return reject(err);
      }
      if (response.statusCode !== 200) {
        reject(new Error('Got unexpected response code ' + response.statusCode));
      } else {
        resolve(JSON.parse(body));
      }
    } catch (reason) {
      return reject(reason);
    }
  }

  /**
   * Performs a secure oauth request to Telldus API.
   * @param path
   * @returns {Promise}
   */
  const request = (path: string) => new Promise((resolve: Function, reject: Function) => {
    oauth.get(
      'https://api.telldus.com/json' + path,
      config.telldusToken,
      config.telldusTokenSecret,
       (err: any, body: any, response: any) => _parseResponse(err, body, response, resolve, reject)
      );
  });

  const get = (path: string, key: string) =>
    new Promise((resolve: Function, reject: Function) => request(path).then((result: any) =>
      resolve(result[key]), (reason: any) => reject(reason)));

  return {
    get: get,
    request: request,
    _parseResponse: _parseResponse
  };
};
