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

interface KeyvMongoNativeOptions {
  collection?: string;
  dbName?: string;
  ttl?: number;
  dbCollectionOptions?: DbCollectionOptions;
  mongoClientCommonOption?: MongoClientCommonOption;
  mongoClientOptions?: MongoClientOptions;
}

class KeyvMongoNative extends EventEmitter {
  collectionThunk: any;

  namespace: string;

  options: KeyvMongoNativeOptions;

  constructor(uri: string, options: KeyvMongoNativeOptions = {}) {
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

  clear = async (): Promise<undefined> => {
    const collection: Collection<any> = await this.collectionThunk();
    const promise: Promise<undefined> = collection
      .deleteMany({
        key: new RegExp(`^${this.namespace}:`)
      })
      .then(() => undefined);

    return promise;
  };

  delete = async (key: any): Promise<boolean> => {
    const collection: Collection<any> = await this.collectionThunk();
    const promise: Promise<boolean> = collection
      .deleteMany({
        key
      })
      .then((value: DeleteWriteOpResultObject) => value.result.n > 0);

    return promise;
  };

  get = async (key: any): Promise<any> => {
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
  };

  set = async (
    key: any,
    value: any,
    ttl: number
  ): Promise<UpdateWriteOpResult> => {
    const expiresAt = typeof ttl === "number" ? Date.now() + ttl : null;
    const collection: Collection<any> = await this.collectionThunk();
    const promise: Promise<UpdateWriteOpResult> = collection
      .updateOne({ key }, { $set: { key, value, expiresAt } }, { upsert: true })
      .then((value: UpdateWriteOpResult) => value);

    return promise;
  };
}

export { KeyvMongoNative as default };
