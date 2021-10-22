# telldus-live-promise

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Actions Status](https://github.com/ashpool/telldus-live-promise/workflows/Node.js%20Package/badge.svg)](https://github.com/ashpool/telldus-live/actions) [![Actions Status](https://github.com/ashpool/telldus-live/workflows/Node%20CI/badge.svg)](https://github.com/ashpool/telldus-live/actions)

A node.js module to interface with the [Telldus Live API](http://api.telldus.com)

## Before Starting

You will need:

- Telldus Live account [login.telldus.com](https://login.telldus.com)

- OAuth tokens [api.telldus.com](http://api.telldus.com/keys/index)

## Install

```bash
npm install telldus-live-promise
```

## API

### Setup

```Javascript
var config = {
  telldusPublicKey: "...",
  telldusPrivateKey: "...",
  telldusToken: "...",
  telldusTokenSecret: "..."
},
telldus = require('telldus-live-promise'),
api = telldus.API(config),
sensors = telldus.Sensors(api);
devices = telldus.Devices(api);
```

### Sensors

#### Read values from all sensors

```bash
sensors.list().then(<do something useful>).catch(<log error>);
```

### Devices

#### Turn off every device

```Javascript
devices.list().then(function(sensors){
	sensors.map(devices.turnOff);
});
```

[npm-url]: https://npmjs.org/package/telldus-live-promise
[downloads-image]: http://img.shields.io/npm/dm/telldus-live-promise.svg
[npm-image]: http://img.shields.io/npm/v/telldus-live-promise.svg
[travis-url]: https://travis-ci.org/ashpool/telldus-live-promise
[travis-image]: http://img.shields.io/travis/ashpool/telldus-live-promise.svg
