import Keyv from "keyv";
import KeyvMongoDb from "this"
import { keyvApiTests, keyvNamepsaceTests, keyvValueTests } from "@keyv/test-suite"
import MongoDbHelper from "./helpers/mongodb.helper"
import test from "ava"

const mongoDatabaseUri = MongoDbHelper.getUri();
const store = () => new KeyvMongoDb(mongoDatabaseUri, {
  collection: "keyv"
});

keyvApiTests(test, Keyv, store);
keyvNamepsaceTests(test, Keyv, store);
//keyvOfficialTests(test, Keyv, mongoDatabaseUri, "mongodb://127.0.0.1:27017");
keyvValueTests(test, Keyv, store);
