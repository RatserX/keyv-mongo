const dotenv = require("dotenv");

class MongoDbHelper {
    static getUri = () => {
        dotenv.config({
            debug: process.env.DOTENV_DEBUG === "true",
            path: `${process.cwd()}/.env`
        });

        const userName = process.env.MONGODB_URI_USERNAME
        const password = process.env.MONGODB_URI_PASSWORD

        let mongoDatabaseUri = process.env.MONGODB_URI_PROTOCOL;
        mongoDatabaseUri += `://`;

        if (userName) {
        mongoDatabaseUri += `${userName}`;

        if (password) {
            mongoDatabaseUri += `:${password}`;
        }

        mongoDatabaseUri += `@`;
        }

        mongoDatabaseUri += process.env.MONGODB_URI_SERVER;
        mongoDatabaseUri += `:${process.env.MONGODB_URI_PORT}`;
        mongoDatabaseUri += `/${process.env.MONGODB_URI_DATABASE}`;

        return mongoDatabaseUri;
    }
}

module.exports = MongoDbHelper;
