const Keyv = require("keyv");
const KeyvMongoDatabase = require("this");
const KeyvTestSuite = require("@keyv/test-suite");
const MongoDbHelper = require("../../helpers/mongodb.helper");
const test = require("ava");

const mongoDatabaseUri = MongoDbHelper.getUri();
const options = {
  collection: "keyv"
};
const store = () => new KeyvMongoDatabase(mongoDatabaseUri, options);

//KeyvTestSuite.keyvApiTests(test, Keyv, store);
//KeyvTestSuite.keyvNamepsaceTests(test, Keyv, store);
KeyvTestSuite.keyvOfficialTests(test, Keyv, mongoDatabaseUri, "mongodb://127.0.0.1:27017");
//KeyvTestSuite.keyvValueTests(test, Keyv, store);
