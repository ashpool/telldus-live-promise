import {ServerResponse} from "http";
import OAuth from 'oauth';
import {Sensor} from "./types";

export default class Telldus {

  config: any;

  oauth: any;

  constructor(config: any) {
    this.config = config;
    this.oauth = new OAuth.OAuth('https://api.telldus.com/oauth/requestToken','https://api.telldus.com/oauth/authorize', config.telldusPublicKey, config.telldusPrivateKey, '1.0', null, 'HMAC-SHA1');
  }

  _parseResponse = (err: Error | undefined, body: any, response: ServerResponse, resolve: Function, reject: Function) => {
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
  };

  /**
   * Performs a secure oauth request to Telldus API.
   * @param path
   * @returns {Promise}
   */
  public request = (path: string): Promise<Sensor[]> => {
    const that = this;
    return new Promise((resolve: Function, reject: Function) => {
      that.oauth.get(
        'https://api.telldus.com/json' + path,
        this.config.telldusToken,
        this.config.telldusTokenSecret,
        function (err: any, body: any, response: any){
          that._parseResponse(err, body, response, resolve, reject);
        });
    });
  };

  public get = (path: string, key: string): Promise<any> => {
    const that = this;
    return new Promise(function (resolve: Function, reject: Function) {
      // @ts-ignore
      return that.request(path).then(function (result: any) {
        return resolve(result[key]);
      }, function (reason: any) {
        reject(reason);
      });
    });
  };
};
