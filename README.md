# @keyv/mongo [<img width="100" align="right" src="https://rawgit.com/lukechilds/keyv/master/media/logo.svg" alt="keyv">](https://github.com/lukechilds/keyv)

> Pure MongoDB storage adapter for Keyv

MongoDB storage adapter for [Keyv](https://github.com/lukechilds/keyv).

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