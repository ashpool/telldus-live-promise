import * as chai from "chai";
import {ServerResponse} from "http";
import {Telldus} from '../src';

chai.should();

describe('client', () => {
  describe('#_parseResponse', () => {
    it('returns the result as JSON.parse(body);', (done) => {
      const config = {};
      const api = new Telldus(config);
      const err = undefined;
      const body = '{"body" : "body"}';
      const response = {statusCode: 200} as ServerResponse;
      const resolve = (value: any) => {
        value.body.should.equal('body');
        done();
      };
      const reject = (reason: any) => done(reason);
      api._parseResponse(err, body, response, resolve, reject);
    });
    it('response code other than 200 yield an error', (done) => {
      const config = {};
      const api = new Telldus(config);
      const err = undefined;
      const body = '{"body" : "body"}';
      const response = {statusCode: 404} as ServerResponse;
      const resolve = () => done('this one should have failed');
      const reject = (reason: any) => {
        reason.name.should.equals('Error');
        reason.message.should.equals('Got unexpected response code 404');
        done();
      };
      api._parseResponse(err, body, response, resolve, reject);
    });
    it('broken body yields an error', function (done) {
      const config = {};
      const api = new Telldus(config);
      const err = undefined;
      const body = {body: 'this is not proper json'};
      const response = {statusCode: 200} as ServerResponse;
      const resolve = function () {
        done('this one should have failed');
      };
      const reject = function (reason: any) {
        reason.name.should.equals('SyntaxError');
        reason.message.should.equals('Unexpected token o in JSON at position 1');
        done();
      };
      api._parseResponse(err, body, response, resolve, reject);
    });
    it('yields an error if err is not empty', function (done) {
      const config = {};
      const api = new Telldus(config);
      const err = new Error('This is an error');
      const body = '{"body": "body"}';
      const response = {statusCode: 200} as ServerResponse;
      const resolve = function () {
        done('this one should have failed');
      };
      const reject = function (reason: any) {
        reason.name.should.equals('Error');
        reason.message.should.equals('This is an error');
        done();
      };
      api._parseResponse(err, body, response, resolve, reject);
    });
  });
});
