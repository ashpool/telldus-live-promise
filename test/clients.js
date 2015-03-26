/*jshint undef:false */
var RSVP = require('rsvp'),
    chaiAsPromised = require('chai-as-promised'),
    chai = require('chai');

chai.should();
chai.use(chaiAsPromised);

var clientsResult =
    [{
        id: '12345',
        uuid: 'x7366xx1-x705-4x36-9134-6xd5037051x1',
        name: 'home',
        online: '1',
        editable: 1,
        extensions: 1,
        version: '17',
        type: 'TellStick Net',
        ip: '127.0.0.1'
    }];

describe('clients', function () {
    describe('#getClients()', function () {
        describe('success', function () {
            it('returns an array of clients', function (done) {
                var api = {
                        get: function invoke () {
                            return new RSVP.Promise(function (resolve) {
                                resolve(clientsResult);
                            });
                        }
                    },
                    clients = require('../lib').Clients(api);
                clients.getClients().should.eventually.equal(clientsResult).notify(done);
            });
        });
        describe('failure', function () {
            it('rejects with an Error', function (done) {
                var api = {
                        get: function invoke () {
                            return new RSVP.Promise(function (resolve, reject) {
                                reject(new Error('failure'));
                            });
                        }
                    },
                    clients = require('../lib').Clients(api);
                clients.getClients().should.be.rejectedWith(Error).notify(done);
            });
        });
    });
});