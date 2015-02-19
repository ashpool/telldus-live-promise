telldus-live-promise
=================

A node.js module to interface with the [Telldus Live API](http://api.telldus.com) [promise style](https://www.promisejs.org/).

Before Starting
---------------
You will need:

- Telldus Live account [login.telldus.com](https://login.telldus.com)

- OAuth tokens [api.telldus.com](http://api.telldus.com/keys/index)

Install
-------

``npm install telldus-live-promise``

API
---

### Load

```
var config = {
  "telldusPublicKey": "...",
  "telldusPrivateKey": "...",
  "telldusToken": "...",
  "telldusTokenSecret": "...",
},
telldusClient = require('telldus-live-promise').Client(config),
telldus = require('telldus-live-promise').Promise(telldusClient, config);
```

### Get sensor information

```
telldus.getSensors().then(telldus.getSensorInfos).then(<do something useful>);
```

_This project uses [telldus-live](https://github.com/TheThingSystem/node-telldus-live) which provides access to the full Telldus Live API_
