/* eslint no-param-reassign: 0 */

const EventEmitter = require("events");
const MongoDB = require("mongodb");

class KeyvMongoDatabase extends EventEmitter {
  constructor(uri, options) {
    super();

    this.init(uri, options);
  }

  async init(uri, options) {
    this.opts = {
      collectionName: "keyv",
      mongoClientCommonOptions: false,
      mongoClientOptions: false,
      ...options
    };

    const mongoClient = await MongoDB.MongoClient
    .connect(
      uri,
      this.opts.mongoClientOptions
    )
    .catch(error => {
      this.emit("error", error);
    });
    
    const mongoDatabase = mongoClient.db(
      this.opts.dbName,
      this.opts.mongoClientCommonOptions
    );

    const mongoCollection = mongoDatabase.collection(
      this.opts.collectionName,
      function(error, collection) {
        if (error) {
          this.emit("error", error);
        }

        collection.createIndex(
          {
            key: 1
          },
          {
            background: true,
            unique: true
          }
        );

        collection.createIndex(
          {
            expiresAt: 1
          },
          {
            background: true,
            expireAfterSeconds: 0
          }
        );
      }
    );
    
    this.collection = ["findOne", "remove", "update"].reduce(
      (previousValue, currentValue, currentIndex, array) => {
        console.log("previousValue ");
        console.log(previousValue);
        console.log("---");
        console.log("currentValue " + currentValue);
        console.log("---");
        console.log("currentIndex " + currentIndex);
        console.log("---");
        console.log("array " + array);
        console.log("---");
        console.log("mongoCollection[currentValue] ");
        console.log(mongoCollection[currentValue]);
        console.log("---");
        console.log("\n\n");

        previousValue[currentValue] = mongoCollection[currentValue].bind(
          mongoCollection
        );

        return previousValue;
      },
      {}
    );

    console.log("mongoCollection");
    console.log(mongoCollection.findOne);
    console.log("this.collection");
    console.log(this.collection);
    console.log("---");

    mongoDatabase.on("error", (...arguments_) => {
      this.emit("error", ...arguments_);
    });
  }

  async clear() {
    console.log("this.collection");
    console.log(this.collection);

    return this.collection.remove({ key: new RegExp(`^${this.namespace}:`) });
  }

  async delete(key) {
    console.log("this.collection");
    console.log(this.collection);

    return this.collection.remove({ key });
  }

  async get(key, options) {
    console.log("this.collection");
    console.log(this.collection);

    return this.collection.findOne({ key }, options, (error, result) => {
      if (error) {
        this.emit("error", error);
      }

      return result;
    });
  }

  async set(key, value, ttl) {
    console.log("this.collection");
    console.log(this.collection);

    if (typeof ttl === "undefined") {
      ttl = this.opts.ttl;
    }

    if (ttl === 0) {
      ttl = undefined;
    }

    const expiresAt = typeof ttl === "number" ? Date.now() + ttl : null;

    return this.collection.update({ key }, { key, value, expiresAt }, { upsert: true });
  }
}

module.exports = KeyvMongoDatabase;
