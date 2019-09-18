import chaiAsPromised from 'chai-as-promised';
import * as chai from "chai";
import {Clients} from "../src";

chai.should();
chai.use(chaiAsPromised);

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

describe('clients', function () {
  describe('#getClients()', function () {
    describe('success', function () {
      it('returns an array of clients', function (done) {
        const api = {
            get: function invoke() {
              return new Promise(function (resolve) {
                resolve(clientsResult);
              });
            }
          };
        const clients = new Clients(api);
        clients.list().should.eventually.equal(clientsResult).notify(done);
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
        const clients = new Clients(api);
        clients.list().should.be.rejectedWith(Error).notify(done);
      });
    });
  });
});
