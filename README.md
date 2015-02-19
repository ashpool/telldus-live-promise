# telldus-live-promise
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

A node.js module to interface with the [Telldus Live API](http://api.telldus.com) [promise style](https://www.promisejs.org/).

## Before Starting
You will need:

- Telldus Live account [login.telldus.com](https://login.telldus.com)

- OAuth tokens [api.telldus.com](http://api.telldus.com/keys/index)

## Install

``npm install telldus-live-promise``

## API

### Setup

```
var config = {
  "telldusPublicKey": "...",
  "telldusPrivateKey": "...",
  "telldusToken": "...",
  "telldusTokenSecret": "...",
  "logLevel": "INFO"
},
telldusClient = require('telldus-live-promise').Client(config),
telldus = require('telldus-live-promise').Telldus(telldusClient, config);
```

### Get sensor information

```
telldus.getSensors().then(telldus.getSensorInfos).then(<do something useful>);
```

_This project uses [telldus-live](https://github.com/TheThingSystem/node-telldus-live) which provides access to the full Telldus Live API_

[npm-url]: https://npmjs.org/package/telldus-live-promise
[downloads-image]: http://img.shields.io/npm/dm/telldus-live-promise.svg
[npm-image]: http://img.shields.io/npm/v/telldus-live-promise.svg
[travis-url]: https://travis-ci.org/ashpool/telldus-live-promise
[travis-image]: http://img.shields.io/travis/ashpool/telldus-live-promise.svg