/*jshint undef:false */
var RSVP = require('rsvp'),
    chaiAsPromised = require('chai-as-promised'),
    chai = require('chai');

chai.should();
expect = chai.expect;
chai.use(chaiAsPromised);

const sensorsResult = [{
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
}];

describe('sensors', function () {
    describe('#getSensors()', function () {
        describe('success', function () {
            it('returns an array of sensors - if everything works fine', function (done) {
                var api = {
                        get: function invoke () {
                            return new RSVP.Promise(function (resolve) {
                                resolve(sensorsResult);
                            });
                        }
                    },
                    sensors = require('../lib').Sensors(api);
                sensors.getSensors().should.eventually.equal(sensorsResult).notify(done);
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
                    sensors = require('../lib').Sensors(api);
                sensors.getSensors().should.be.rejectedWith(Error).notify(done);
            });
        });
    });
});
