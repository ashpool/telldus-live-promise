/*jshint undef:false */
/*jshint maxparams:false */
/*jshint unused:false */
var chai = require('chai');
chai.should();

describe('client', function () {
    describe('#_parseResponse', function () {
        it('returns the result as JSON.parse(body);', function (done) {
            var config =
                {},
                telldus = require('../lib'),
                client = telldus.Client(config),
                err = null,
                body = '{"body" : "body"}',
                response = {statusCode: 200},
                method = 'GET',
                resolve = function (value) {
                    value.body.should.equal('body');
                    done();
                },
                reject = function (reason) {
                    done(reason);
                };
            client._parseResponse(err, body, response, method, resolve, reject);
        });
        it('response code other than 200 yield an error', function (done) {
            var config =
                {},
                telldus = require('../lib'),
                client = telldus.Client(config),
                err = null,
                body = '{"body" : "body"}',
                response = {statusCode: 404},
                method = 'GET',
                resolve = function () {
                    done('this one should have failed');
                },
                reject = function (reason) {
                    reason.name.should.equals('Error');
                    reason.message.should.equals('Got unexpected response code 404');
                    done();
                };
            client._parseResponse(err, body, response, method, resolve, reject);
        });
        it('broken body yields an error', function (done) {
            var config =
                {},
                telldus = require('../lib'),
                client = telldus.Client(config),
                err = null,
                body = {body: 'this is not proper json'},
                response = {statusCode: 200},
                method = 'GET',
                resolve = function () {
                    done('this one should have failed');
                },
                reject = function (reason) {
                    reason.name.should.equals('SyntaxError');
                    reason.message.should.equals('Unexpected token o');
                    done();
                };
            client._parseResponse(err, body, response, method, resolve, reject);
        });
        it('yields an error if err is not empty', function (done) {
            var config =
                {},
                telldus = require('../lib'),
                client = telldus.Client(config),
                err = new Error('This is an error'),
                body = {"body": "body"},
                response = {statusCode: 200},
                method = 'GET',
                resolve = function () {
                    done('this one should have failed');
                },
                reject = function (reason) {
                    reason.name.should.equals('Error');
                    reason.message.should.equals('This is an error');
                    done();
                };
            client._parseResponse(err, body, response, method, resolve, reject);
        });
    });
});
