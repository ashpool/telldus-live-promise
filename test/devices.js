/*jshint undef:false */
var RSVP = require('rsvp'),
    chaiAsPromised = require('chai-as-promised'),
    chai = require('chai');

chai.should();
expect = chai.expect;
chai.use(chaiAsPromised);

var devicesResult = [
    {
        id: '240000',
        clientDeviceId: '14',
        name: '##Everything',
        state: 0,
        statevalue: null,
        methods: 0,
        type: 'group',
        client: '10000',
        clientName: 'home',
        online: '1',
        editable: 1,
        devices: '240001, 240001'
    },
    {
        id: '240001',
        clientDeviceId: '7',
        name: 'Livingroom-light',
        state: 0,
        statevalue: '0',
        methods: 0,
        type: 'device',
        client: '10000',
        clientName: 'home',
        online: '1',
        editable: 1
    },
    {
        id: '240002',
        clientDeviceId: '7',
        name: 'Livingroom-light',
        state: 0,
        statevalue: '0',
        methods: 0,
        type: 'device',
        client: '10000',
        clientName: 'home',
        online: '1',
        editable: 1
    }];

describe('devices', function () {
    describe('#getDevices()', function () {
        describe('success', function () {
            it('returns an array of sensors - if everything works fine', function (done) {
                var api = {
                        get: function invoke () {
                            return new RSVP.Promise(function (resolve) {
                                resolve(devicesResult);
                            });
                        }
                    },
                    devices = require('../lib').Devices(api);
                devices.getDevices().should.eventually.equal(devicesResult).notify(done);
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
                    devices = require('../lib').Devices(api);
                devices.getDevices().should.be.rejectedWith(Error).notify(done);
            });
        });
    });
    describe('#turnOn', function () {
        var success = {status: 'success'};
        it('takes object {id: "anId""}) as argument', function (done) {
            var api = {
                    request: function invoke () {
                        return new RSVP.Promise(function (resolve) {
                            resolve(success);
                        });
                    }
                },
                devices = require('../lib').Devices(api);
            devices.turnOn({id: 'anId'}).should.eventually.equal(success).notify(done);
        });
        it('takes string id as argument', function (done) {
            var api = {
                    request: function invoke () {
                        return new RSVP.Promise(function (resolve) {
                            resolve(success);
                        });
                    }
                },
                devices = require('../lib').Devices(api);
            devices.turnOn('anId').should.eventually.equal(success).notify(done);
        });
    });
    describe('#turnOff', function () {
        var success = {status: 'success'};
        it('takes object {id: "anId""}) as argument', function (done) {
            var api = {
                    request: function invoke () {
                        return new RSVP.Promise(function (resolve) {
                            resolve(success);
                        });
                    }
                },
                devices = require('../lib').Devices(api);
            devices.turnOff({id: 'anId'}).should.eventually.equal(success).notify(done);
        });
        it('takes string id as argument', function (done) {
            var api = {
                    request: function invoke () {
                        return new RSVP.Promise(function (resolve) {
                            resolve(success);
                        });
                    }
                },
                devices = require('../lib').Devices(api);
            devices.turnOff('anId').should.eventually.equal(success).notify(done);
        });
    });
});
