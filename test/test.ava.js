const DotEnv = require("dotenv");
const Keyv = require("keyv");
const KeyvMongoDatabase = require("this");
const KeyvTestSuite = require("@keyv/test-suite");
const test = require("ava");

DotEnv.config({
  debug: process.env.DOTENV_DEBUG === "true",
  path: `${process.cwd()}/.env`
});

let mongoDatabaseUri = process.env.MONGODB_URI_PROTOCOL;
mongoDatabaseUri += `://${process.env.MONGODB_URI_USERNAME}`;
mongoDatabaseUri += `:${process.env.MONGODB_URI_PASSWORD}`;
mongoDatabaseUri += `@${process.env.MONGODB_URI_SERVER}`;
mongoDatabaseUri += `/${process.env.MONGODB_URI_DATABASE}`;

console.log(__dirname);
console.log(mongoDatabaseUri);

const store = () => new KeyvMongoDatabase(mongoDatabaseUri);

KeyvTestSuite.keyvApiTests(test, Keyv, store);
// KeyvTestSuite.keyvNamepsaceTests(test, Keyv, store);
// KeyvTestSuite.keyvOfficialTests(test, Keyv, mongoDatabaseUri, "mongodb://127.0.0.1:27017");
// KeyvTestSuite.keyvValueTests(test, Keyv, store);

test("Object is initialized", implementation => {
  let options = {
    collection: "keyv"
  };

  const keyvMongoDatabase = new KeyvMongoDatabase(mongoDatabaseUri, options);

  implementation.assert(keyvMongoDatabase);
});

/* test("Collection option merges into default options if URL is passed", implementation => {
  const keyvMongoDatabase = new KeyvMongoDatabase(mongoDatabaseUri, {
    collection: "foo"
  });

  implementation.deepEqual(keyvMongoDatabase.opts, {
    collection: "foo",
    url: mongoDatabaseUri
  });
}); */

/* test(".delete() with no args doesn't empty the collection", async macros => {
  const keyvMongoDatabase = new KeyvMongoDatabase("foo");

  macros.false(await keyvMongoDatabase.delete());
}); */
