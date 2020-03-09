import { config } from "dotenv"
import Keyv from "keyv";
import KeyvMongoNative from "this"
import { keyvApiTests, keyvNamepsaceTests, keyvValueTests } from "@keyv/test-suite"
import MongoDbHelper from "./helpers/mongodb.helper"
import test from "ava"

config({
  debug: process.env.DOTENV_DEBUG === "true",
  path: `${process.cwd()}/.env`
});

const mongoDatabaseUri = MongoDbHelper.getConnectionStringUri(process.env.MONGODB_HOST, process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD, process.env.MONGODB_PORT, process.env.MONGODB_DEFAULTAUTHDB);
const store = () => new KeyvMongoNative(mongoDatabaseUri, {
  collection: "keyv"
});

keyvApiTests(test, Keyv, store);
keyvNamepsaceTests(test, Keyv, store);
//keyvOfficialTests(test, Keyv, mongoDatabaseUri, "mongodb://127.0.0.1:27017");
keyvValueTests(test, Keyv, store);
