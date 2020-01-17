/* eslint no-param-reassign: 0 */

import EventEmitter from "events";
import mongodb from "mongodb";
import pify from "pify";

class KeyvMongoDatabase extends EventEmitter {
  constructor(url, options) {
    super();

    this.ttlSupport = false;
    url = url || {};

    if (typeof url === "string") {
      url = { url };
    }

    if (url.uri) {
      url = { url: url.uri, ...url };
    }

    this.options = {
      url: "mongodb://127.0.0.1:27017",
      collection: "keyv",
      ...url,
      ...options
    };

    const client = new mongodb.MongoClient(
      this.options.url,
      this.options.mongoClientOptions
    );
    this.db = client;

    const collection = this.db.collection(this.options.collection);

    collection.createIndex(
      { key: 1 },
      {
        unique: true,
        background: true
      }
    );
    collection.createIndex(
      { expiresAt: 1 },
      {
        expireAfterSeconds: 0,
        background: true
      }
    );

    this.mongo = ["update", "findOne", "remove"].reduce((object, method) => {
      object[method] = pify(collection[method].bind(collection));

      return object;
    }, {});

    this.db.on("error", error => this.emit("error", error));
  }

  get(key) {
    return this.mongo.findOne({ key }).then(document_ => {
      if (document_ === null) {
        return undefined;
      }
      return document_.value;
    });
  }

  set(key, value, ttl) {
    const expiresAt =
      typeof ttl === "number" ? new Date(Date.now() + ttl) : null;

    return this.mongo.update(
      { key },
      { key, value, expiresAt },
      { upsert: true }
    );
  }

  delete(key) {
    if (typeof key !== "string") {
      return Promise.resolve(false);
    }
    return this.mongo.remove({ key }).then(object => object.n > 0);
  }

  clear() {
    return this.mongo
      .remove({ key: new RegExp(`^${this.namespace}:`) })
      .then(() => undefined);
  }
}

export default KeyvMongoDatabase;
