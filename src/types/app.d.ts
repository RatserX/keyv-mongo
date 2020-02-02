/// <reference types="node" />
import { EventEmitter } from "events";
import { DbCollectionOptions, DeleteWriteOpResultObject, MongoClientCommonOption, MongoClientOptions, UpdateWriteOpResult } from "mongodb";
interface KeyvMongoDatabaseOptions {
    collection?: string;
    dbName?: string;
    ttl?: number;
    dbCollectionOptions?: DbCollectionOptions;
    mongoClientCommonOption?: MongoClientCommonOption;
    mongoClientOptions?: MongoClientOptions;
}
declare class KeyvMongoDatabase extends EventEmitter {
    collectionThunk: any;
    namespace: string;
    options: KeyvMongoDatabaseOptions;
    constructor(uri: string, options: KeyvMongoDatabaseOptions);
    clear: () => Promise<DeleteWriteOpResultObject>;
    delete: (key: any) => Promise<boolean>;
    get: (key: any) => Promise<any>;
    set: (key: any, value: any, ttl: number) => Promise<UpdateWriteOpResult>;
}
export { KeyvMongoDatabase as default };
//# sourceMappingURL=app.d.ts.map