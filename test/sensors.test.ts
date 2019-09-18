import chaiAsPromised from 'chai-as-promised';
import * as chai from "chai";
import {Sensors} from '../src';

chai.should();
chai.use(chaiAsPromised);

const sensorsResult =
    [{
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
    }],
  sensorInfoResult =
  {
    id: '3120422',
    clientName: 'home',
    name: 'wind',
    lastUpdated: 1427266235,
    ignored: 0,
    editable: 1,
    data: [{name: 'wavg', value: '4.4', scale: '0'},
      {name: 'wgust', value: '4.5', scale: '0'},
      {name: 'wdir', value: '157.5', scale: '0'}],
    protocol: 'oregon',
    sensorId: '12',
    timezoneoffset: 3600,
    battery: '253',
    keepHistory: '0'
  };

describe('sensors', function () {
  describe('#list()', function () {
    describe('success', function () {
      it('returns an array of sensors', function (done) {
        const api = {
            request: function invoke() {
              return new Promise(function (resolve) {
                resolve(sensorsResult);
              });
            }
          };
        const sensors = new Sensors(api);
        sensors.list().should.eventually.equal(sensorsResult).notify(done);
      });
    });
    describe('failure', function () {
      it('rejects with an Error', function (done) {
        const api = {
            request: function invoke() {
              return new Promise(function (resolve, reject) {
                reject(new Error('failure'));
              });
            }
          };
        const sensors = new Sensors(api);
        sensors.list().should.be.rejectedWith(Error).notify(done);
      });
    });
  });
  describe('#info', function () {
    describe('success', function () {
      it('returns sensor info', function (done) {
        const api = {
            request: function invoke() {
              return new Promise(function (resolve) {
                resolve(sensorInfoResult);
              });
            }
          };
        const sensors = new Sensors(api);
        sensors.info({id: '3120422'}).should.eventually.equal(sensorInfoResult).notify(done);
      });
    });
  });
});
