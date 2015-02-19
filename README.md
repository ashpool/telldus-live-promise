telldus-live-promise
=================

A node.js module to interface with the [Telldus Live API](http://api.telldus.com).

Before Starting
---------------
You will need a Telldus Live account and OAuth tokens:

- To get a Telldus Live account, go to [login.telldus.com](https://login.telldus.com)

- Once you have a Telldus Live account, go to [api.telldus.com](http://api.telldus.com/keys/index) and _Generate a private token for my user only_.


Install
-------

``npm install telldus-live-promise`

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

Finally
-------
This project uses [telldus-live)](https://github.com/TheThingSystem/node-telldus-live)
