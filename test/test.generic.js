/* eslint no-new: 0 */

const DotEnv = require("dotenv");
const KeyvMongoDatabase = require("this");

DotEnv.config({
  debug: process.env.DOTENV_DEBUG === "true",
  path: `${process.cwd()}/.env`
});

let mongoDatabaseUri = process.env.MONGODB_URI_PROTOCOL;
mongoDatabaseUri += `://${process.env.MONGODB_URI_USERNAME}`;
mongoDatabaseUri += `:${process.env.MONGODB_URI_PASSWORD}`;
mongoDatabaseUri += `@${process.env.MONGODB_URI_SERVER}`;
mongoDatabaseUri += `/${process.env.MONGODB_URI_DATABASE}`;

console.log(mongoDatabaseUri);

let options = {
  collection: "keyv"
};

new KeyvMongoDatabase(mongoDatabaseUri, options);
