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

describe('sensors',  () => {
  describe('#list()', () => {
    describe('success',  () => {
      it('returns an array of sensors',  async () => {
        const api = {
            request: () => new Promise((resolve) => resolve(sensorsResult))
          };
          const sensors = require('../src').Sensors(api);
        expect(await sensors.list()).toEqual(sensorsResult);
      });
    });
    describe('failure', () => {
      it('rejects with an Error', async () => {
        const api = {
          request: () => new Promise(() => new Error('failure'))
        };
        const sensors = require('../src').Sensors(api);
        expect(sensors.list()).rejects.toThrow(Error);
      });
    });
  });
  describe('#info', () => {
    describe('success', () => {
      it('returns sensor info', async () => {
        const api = {
          request: () => new Promise((resolve) => resolve(sensorInfoResult))
        };
        const sensors = require('../src').Sensors(api);
        expect(await sensors.info({id: '3120422'})).toEqual(sensorInfoResult);
      });
    });
  });
});
