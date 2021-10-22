const clientsResult =
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

describe('clients', () => {
  describe('#getClients()', () => {
    describe('success', () => {
      it('returns an array of clients', async () => {
        const api = {
          get: () => new Promise((resolve) => resolve(clientsResult))
        };
        const clients = require('../src').Clients(api);
        expect(await clients.list()).toEqual(clientsResult);
      });
    });
    describe('failure', () => {
      it('rejects with an Error', () => {
        const api = {
          get: () => new Promise((resolve, reject)  => reject(new Error('failure')))
        };
        const clients = require('../src').Clients(api);
        expect(clients.list()).rejects.toThrow(Error);
      });
    });
  });
});
