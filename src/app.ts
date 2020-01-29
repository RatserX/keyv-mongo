import { EventEmitter } from "events";
import {
  Collection,
  DbCollectionOptions,
  MongoClient,
  MongoClientCommonOption,
  MongoClientOptions,
  MongoError,
  DeleteWriteOpResultObject,
  Db
} from "mongodb";
import thunkyp from "thunky/promise";

interface KeyvMongoDatabaseOptions {
  collection: string;
  dbName?: string;
  ttl: number;
  dbCollectionOptions: DbCollectionOptions;
  mongoClientCommonOption: MongoClientCommonOption;
  mongoClientOptions: MongoClientOptions;
}

class KeyvMongoDatabase extends EventEmitter {
  namespace: string;

  options: KeyvMongoDatabaseOptions;

  thunk: any;

  constructor(uri: string, options: KeyvMongoDatabaseOptions) {
    super();

    this.options = {
      collection: "keyv",
      dbCollectionOptions: false as DbCollectionOptions,
      mongoClientCommonOption: false as MongoClientCommonOption,
      mongoClientOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as MongoClientOptions,
      ...options
    };
    
    this.thunk = thunkyp(async () => {
      const mongoClient: MongoClient = await MongoClient.connect(
        uri,
        this.options.mongoClientOptions
      );

      const database: Db = mongoClient.db(
        this.options.dbName,
        this.options.mongoClientCommonOption
      );
      const collection: Collection<any> = database.collection(
        this.options.collection,
        this.options.dbCollectionOptions
      );

      collection.createIndex({ key: 1 }, { background: true, unique: true });
      collection.createIndex(
        { expiresAt: 1 },
        { background: true, expireAfterSeconds: 0 }
      );

      database.on("error", (...arguments_: any) => {
        this.emit("error", ...arguments_);
      });

      return collection;
    });
  }

  async clear() {
    const collection: Collection<any> = await this.thunk();

    await collection.deleteMany({
      key: new RegExp(`^${this.namespace}:`)
    });

    return Promise.resolve(undefined);
  }

  async delete(key: any) {
    const collection: Collection<any> = await this.thunk();
    const result: DeleteWriteOpResultObject = await collection.deleteMany({
      key
    });

    return Promise.resolve(result.result.n > 0);
  }

  async get(key: any) {
    const collection: Collection<any> = await this.thunk();
    const result: any = await collection.findOne({ key });

    if (result === null) {
      return Promise.resolve(undefined);
    }

    return Promise.resolve(result.value);
  }

  async set(key: any, value: any, ttl: number) {
    const expiresAt = typeof ttl === "number" ? Date.now() + ttl : null;
    const collection: Collection<any> = await this.thunk();
    const result: any = await collection.updateOne(
      { key },
      { $set: { key, value, expiresAt } },
      { upsert: true }
    );

    return Promise.resolve(result);
  }
}

module.exports = KeyvMongoDatabase;
