import { EventEmitter } from "events";
import {
  Collection,
  Db,
  DbCollectionOptions,
  DeleteWriteOpResultObject,
  MongoClient,
  MongoClientCommonOption,
  MongoClientOptions,
  UpdateWriteOpResult
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
  collectionThunk: any;

  namespace: string;

  options: KeyvMongoDatabaseOptions;

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

    this.collectionThunk = thunkyp(async () => {
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
    const collection: Collection<any> = await this.collectionThunk();
    const promise: Promise<DeleteWriteOpResultObject> = collection
      .deleteMany({
        key: new RegExp(`^${this.namespace}:`)
      })
      .then(() => undefined);

    return promise;
  }

  async delete(key: any) {
    const collection: Collection<any> = await this.collectionThunk();
    const promise: Promise<boolean> = collection
      .deleteMany({
        key
      })
      .then((value: DeleteWriteOpResultObject) => value.result.n > 0);

    return promise;
  }

  async get(key: any) {
    const collection: Collection<any> = await this.collectionThunk();
    const promise: Promise<any> = await collection
      .findOne({ key })
      .then((value: any) => {
        if (value === null) {
          return undefined;
        }

        return value.value;
      });

    return promise;
  }

  async set(key: any, value: any, ttl: number) {
    const expiresAt = typeof ttl === "number" ? Date.now() + ttl : null;
    const collection: Collection<any> = await this.collectionThunk();
    const promise: Promise<UpdateWriteOpResult> = collection
      .updateOne({ key }, { $set: { key, value, expiresAt } }, { upsert: true })
      .then((value: UpdateWriteOpResult) => value);

    return promise;
  }
}

module.exports = KeyvMongoDatabase;
