import chaiAsPromised from 'chai-as-promised';
import * as chai from "chai";
import {Devices} from '../src';

chai.should();
chai.use(chaiAsPromised);

const devicesResult = [
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
  describe('#list()', function () {
    describe('success', function () {
      it('returns an array of devices', function (done) {
        const api = {
            get: function invoke() {
              return new Promise(function (resolve) {
                resolve(devicesResult);
              });
            }
          };
        const devices = new Devices(api);
        devices.list().should.eventually.equal(devicesResult).notify(done);
      });
    });
    describe('failure', function () {
      it('rejects with an Error', function (done) {
        const api = {
            get: function invoke() {
              return new Promise(function (resolve, reject) {
                reject(new Error('failure'));
              });
            }
          };
        const devices = new Devices(api);
        devices.list().should.be.rejectedWith(Error).notify(done);
      });
    });
  });
  describe('#turnOn', function () {
    const success = {status: 'success'};
    it('takes object {id: "anId""}) as argument', function (done) {
      const api = {
          request: function invoke() {
            return new Promise(function (resolve) {
              resolve(success);
            });
          }
        };
      const devices = new Devices(api);
      devices.turnOn({id: 'anId'}).should.eventually.equal(success).notify(done);
    });
    it('takes string id as argument', function (done) {
      const api = {
          request: function invoke() {
            return new Promise(function (resolve) {
              resolve(success);
            });
          }
        };
      const devices = new Devices(api);
      devices.turnOn('anId').should.eventually.equal(success).notify(done);
    });
  });
  describe('#history', function () {
    const success = {status: 'success'};
    it('returns device history', function (done) {
      const api = {
          request: function invoke() {
            return new Promise(function (resolve) {
              resolve(success);
            });
          }
        };
      const devices = new Devices(api);
      devices.history({id: 'anId'}, 1400471506, 1479471506).should.eventually.equal(success).notify(done);
    })
  });
  describe('#turnOff', function () {
    const success = {
      status: {
        'history': [{
          'ts': 1477467846,
          'state': 1,
          'stateValue': 0,
          'origin': 'Incoming signal',
          'successStatus': 0
        }, {
          'ts': 1477467846,
          'state': 1,
          'stateValue': 0,
          'origin': 'Incoming signal',
          'successStatus': 0
        }]
      }
    };
    it('takes object {id: "anId""}) as argument', function (done) {
      const api = {
          request: function invoke() {
            return new Promise(function (resolve) {
              resolve(success);
            });
          }
        };
      const devices = new Devices(api);
      devices.turnOff({id: 'anId'}).should.eventually.equal(success).notify(done);
    });
    it('takes string id as argument', function (done) {
      const api = {
          request: function invoke() {
            return new Promise(function (resolve) {
              resolve(success);
            });
          }
        };
      const devices = new Devices(api);
      devices.turnOff('anId').should.eventually.equal(success).notify(done);
    });
  });
});
