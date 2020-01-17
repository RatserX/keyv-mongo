import dotenv from "dotenv";
import test from "ava";
import Keyv from "keyv";
import {
  keyvApiTests,
  keyvNamepsaceTests,
  keyvOfficialTests,
  keyvValueTests
} from "@keyv/test-suite";
import KeyvMongoDb from "this";

dotenv.config({
  debug: true
});

let mongoDatabaseUri = process.env.MONGODB_URI_PROTOCOL;
mongoDatabaseUri += `://${process.env.MONGODB_URI_USERNAME}`;
mongoDatabaseUri += `:${process.env.MONGODB_URI_PASSWORD}`;
mongoDatabaseUri += `@${process.env.MONGODB_URI_SERVER}`;
mongoDatabaseUri += `/${process.env.MONGODB_URI_DATABASE}`;
const store = () => new KeyvMongoDb(mongoDatabaseUri);

keyvApiTests(test, Keyv, store);
//keyvNamepsaceTests(test, Keyv, store);
//keyvOfficialTests(test, Keyv, mongoDatabaseUri, "mongodb://127.0.0.1:27017");
//keyvValueTests(test, Keyv, store);

/*test("Collection option merges into default options if URL is passed", macros => {
  const keyvMongoDatabase = new KeyvMongoDb(mongoDatabaseUri, {
    collection: "foo"
  });

  macros.deepEqual(keyvMongoDatabase.opts, {
    collection: "foo",
    url: mongoDatabaseUri
  });
});

test(".delete() with no args doesn't empty the collection", async macros => {
  const keyvMongoDatabase = new KeyvMongoDb("foo");

  macros.false(await keyvMongoDatabase.delete());
});*/
