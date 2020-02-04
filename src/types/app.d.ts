/// <reference types="node" />
import { EventEmitter } from "events";
import { DbCollectionOptions, DeleteWriteOpResultObject, MongoClientCommonOption, MongoClientOptions, UpdateWriteOpResult } from "mongodb";
interface KeyvMongoOptions {
    collection?: string;
    dbName?: string;
    ttl?: number;
    dbCollectionOptions?: DbCollectionOptions;
    mongoClientCommonOption?: MongoClientCommonOption;
    mongoClientOptions?: MongoClientOptions;
}
declare class KeyvMongo extends EventEmitter {
    collectionThunk: any;
    namespace: string;
    options: KeyvMongoOptions;
    constructor(uri: string, options: KeyvMongoOptions);
    clear: () => Promise<DeleteWriteOpResultObject>;
    delete: (key: any) => Promise<boolean>;
    get: (key: any) => Promise<any>;
    set: (key: any, value: any, ttl: number) => Promise<UpdateWriteOpResult>;
}
export { KeyvMongo as default };
//# sourceMappingURL=app.d.ts.map