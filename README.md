# @keyv/mongodb [<img width="100" align="right" src="https://rawgit.com/lukechilds/keyv/master/media/logo.svg" alt="keyv">](https://github.com/lukechilds/keyv)

> Yet another MongoDB storage adapter for Keyv

[![Build Status](https://travis-ci.com/RatserX/keyv-mongodb.svg?token=Az56pmx34zmn4Ap6pZAz&branch=master)](https://travis-ci.com/RatserX/keyv-mongodb)
[![Buy me a coffee](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg)](https://www.buymeacoffee.com/Ratser)

MongoDB storage adapter for [Keyv](https://github.com/lukechilds/keyv). Uses the original MongoDB Node.js Driver instead of MongoJS.

Uses TTL indexes to automatically remove expired documents. However [MongoDB doesn't guarantee data will be deleted immediately upon expiration](https://docs.mongodb.com/manual/core/index-ttl/#timing-of-the-delete-operation), so expiry dates are revalidated in Keyv.

## Install

```shell
npm install --save keyv
```

## Usage

```js
const Keyv = require('keyv');

const keyv = new Keyv({ store: new KeyvMongoDatabase('mongodb://user:pass@localhost:27017/dbname') });
keyv.on('error', handleConnectionError);
```

## License

MIT © RatserX
