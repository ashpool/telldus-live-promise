/*jshint undef:false */
var RSVP = require('rsvp'),
    chai = require('chai');
chai.should();

const sensorsResult = {
    sensor: [{
        id: '2813567',
        name: 'firstfloor',
        lastUpdated: 1423582025,
        ignored: 0,
        client: '58229',
        clientName: 'Hemma',
        online: '1',
        editable: 1,
        battery: 254
    }, {
        id: '2814769',
        name: 'freezer',
        lastUpdated: 1423582285,
        ignored: 0,
        client: '58229',
        clientName: 'Hemma',
        online: '1',
        editable: 1,
        battery: 254
    }, {
        id: '2813556',
        name: 'fridge',
        lastUpdated: 1423582490,
        ignored: 0,
        client: '58229',
        clientName: 'Hemma',
        online: '1',
        editable: 1,
        battery: 254
    }]
};

describe('sensors', function () {
    describe('#getSensors()', function () {
        var logger = console;
        describe('success', function () {
            it('returns an array of sensors - if everything works fine', function (done) {
                var client = {
                        invoke: function invoke () {
                            return new RSVP.Promise(function (resolve) {
                                resolve(sensorsResult);
                            });
                        }
                    },
                    sensors = require('../lib').Sensors(client, { logger: logger });
                sensors.getSensors().then(function (result) {
                    result.should.equal(sensorsResult.sensor);
                    done();
                }).catch(function (reason) {
                    done(reason);
                });
            });
        });
        describe('failure', function () {
            it('forwards error message', function (done) {
                var client = {
                        invoke: function invoke () {
                            return new RSVP.Promise(function (resolve, reject) {
                                reject('failure');
                            });
                        }
                    },
                    sensors = require('../lib').Sensors(client, { logger: logger });
                sensors.getSensors().then(function () {
                    done('this call should fail');
                }).catch(function (reason) {
                    reason.should.equal('failure');
                    done();
                });
            });
        });
    });
});
