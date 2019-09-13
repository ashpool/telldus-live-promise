import * as chai from "chai";
chai.should();

describe('client', () => {
  describe('#_parseResponse', () => {
    it('returns the result as JSON.parse(body);', (done) => {
      const config = {};
        const telldus = require('../lib');
        const api = telldus.API(config);
        const err = null;
        const body = '{"body" : "body"}';
        const response = {statusCode: 200},
        resolve = (value: any) => {
          value.body.should.equal('body');
          done();
        },
        reject = (reason: any) => done(reason);
      api._parseResponse(err, body, response, resolve, reject);
    });
    it('response code other than 200 yield an error', (done) => {
      var config =
        {},
        telldus = require('../lib'),
        api = telldus.API(config),
        err = null,
        body = '{"body" : "body"}',
        response = {statusCode: 404},
        resolve = function () {
          done('this one should have failed');
        },
        reject = function (reason: any) {
          reason.name.should.equals('Error');
          reason.message.should.equals('Got unexpected response code 404');
          done();
        };
      api._parseResponse(err, body, response, resolve, reject);
    });
    it('broken body yields an error', function (done) {
      var config =
        {},
        telldus = require('../lib'),
        api = telldus.API(config),
        err = null,
        body = {body: 'this is not proper json'},
        response = {statusCode: 200},
        resolve = function () {
          done('this one should have failed');
        },
        reject = function (reason: any) {
          reason.name.should.equals('SyntaxError');
          reason.message.should.equals('Unexpected token o in JSON at position 1');
          done();
        };
      api._parseResponse(err, body, response, resolve, reject);
    });
    it('yields an error if err is not empty', function (done) {
      var config =
        {},
        telldus = require('../lib'),
        api = telldus.API(config),
        err = new Error('This is an error'),
        body = '{"body": "body"}',
        response = {statusCode: 200},
        resolve = function () {
          done('this one should have failed');
        },
        reject = function (reason: any) {
          reason.name.should.equals('Error');
          reason.message.should.equals('This is an error');
          done();
        };
      api._parseResponse(err, body, response, resolve, reject);
    });
  });
});
