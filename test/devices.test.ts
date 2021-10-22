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

describe('devices', () => {
  describe('#list()', () => {
    describe('success', () => {
      it('returns an array of devices', async () => {
        const api = {
          get: () => new Promise((resolve) => resolve(devicesResult))
        };
        const devices = require('../src').Devices(api);
        expect(await devices.list()).toEqual(devicesResult);
      });
    });
    describe('failure', () => {
      it('rejects with an Error', () => {
        const api = {
          get: () => new Promise((resolve, reject) => reject(new Error('failure')))
        };
        const devices = require('../src').Devices(api);
        expect(devices.list()).rejects.toThrow(Error);
      });
    });
  });
  describe('#turnOn', () => {
    const success = {status: 'success'};
    it('takes object {id: "anId""}) as argument', async () => {
      const api = {
        request: () => new Promise((resolve) => resolve(success))
      };
      const devices = require('../src').Devices(api);
      expect(await devices.turnOn({id: 'anId'})).toEqual(success);
    });
    it('takes string id as argument', async () => {
      const api = {
        request: () => new Promise((resolve) => resolve(success))
      };
      const devices = require('../src').Devices(api);
      expect(await devices.turnOn('anId')).toEqual(success);
    });
  });
  describe('#history', () => {
    const success = {status: 'success'};
    it('returns device history', async () => {
      const api = {
        request: () => new Promise((resolve) => resolve(success))
      };
      const devices = require('../src').Devices(api);
      expect(await devices.history({id: 'anId'}, 1400471506, 1479471506)).toEqual(success);
    })
  });
  describe('#turnOff', () => {
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
    it('takes object {id: "anId""}) as argument', async () => {
      const api = {
        request: () => new Promise((resolve) => resolve(success))
      };
      const devices = require('../src').Devices(api);
      expect(await devices.turnOff({id: 'anId'})).toEqual(success);
    });
    it('takes string id as argument', async () => {
      const api = {
        request: () => new Promise((resolve) => resolve(success))
      };
      const devices = require('../src').Devices(api);
      expect(await devices.turnOff('anId')).toEqual(success);
    });
  });
});
