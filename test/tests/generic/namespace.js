const KeyvMongoDatabase = require("this");
const MongoDbHelper = require("../../helpers/mongodb.helper");

const mongoDatabaseUri = MongoDbHelper.getUri();
const options = {
  collection: "keyv"
};
const keyvMongoDatabase = new KeyvMongoDatabase(mongoDatabaseUri, options);
(async () => {
  console.log(await keyvMongoDatabase.clear());
})();
