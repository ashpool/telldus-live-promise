/*jshint undef:false */
var RSVP = require('rsvp'),
    chai = require('chai');
chai.should();

var devicesResult = {
    device: [
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
        }]
};

describe('devices', function () {
    describe('#getDevices()', function () {
        describe('success', function () {
            it('returns an array of sensors - if everything works fine', function (done) {
                var api = {
                        request: function invoke () {
                            return new RSVP.Promise(function (resolve) {
                                resolve(devicesResult);
                            });
                        }
                    },
                    devices = require('../lib').Devices(api);
                devices.getDevices().then(function (result) {
                    result.should.equal(devicesResult.device);
                    done();
                }).catch(function (reason) {
                    done(reason);
                });
            });
        });
        describe('failure', function () {
            it('forwards error message', function (done) {
                var api = {
                        request: function invoke () {
                            return new RSVP.Promise(function (resolve, reject) {
                                reject('failure');
                            });
                        }
                    },
                    devices = require('../lib').Devices(api);
                devices.getDevices().then(function () {
                    done('this call should fail');
                }).catch(function (reason) {
                    reason.should.equal('failure');
                    done();
                });
            });
        });
    });
});
