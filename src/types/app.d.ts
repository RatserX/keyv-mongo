/// <reference types="node" />
import { EventEmitter } from "events";
import { DbCollectionOptions, DeleteWriteOpResultObject, MongoClientCommonOption, MongoClientOptions, UpdateWriteOpResult } from "mongodb";
interface KeyvMongoNativeOptions {
    collection?: string;
    dbName?: string;
    ttl?: number;
    dbCollectionOptions?: DbCollectionOptions;
    mongoClientCommonOption?: MongoClientCommonOption;
    mongoClientOptions?: MongoClientOptions;
}
declare class KeyvMongoNative extends EventEmitter {
    collectionThunk: any;
    namespace: string;
    options: KeyvMongoNativeOptions;
    constructor(uri: string, options: KeyvMongoNativeOptions);
    clear: () => Promise<DeleteWriteOpResultObject>;
    delete: (key: any) => Promise<boolean>;
    get: (key: any) => Promise<any>;
    set: (key: any, value: any, ttl: number) => Promise<UpdateWriteOpResult>;
}
export { KeyvMongoNative as default };
//# sourceMappingURL=app.d.ts.map