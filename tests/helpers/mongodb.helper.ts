import { config } from "dotenv"

class MongoDbHelper {
    public static getUri = () => {
        config({
            debug: process.env.DOTENV_DEBUG === "true",
            path: `${process.cwd()}/.env`
        });

        const userName = process.env.MONGODB_URI_USERNAME;
        const password = process.env.MONGODB_URI_PASSWORD;
        const server = process.env.MONGODB_URI_SERVER;

        let mongoDatabaseUri = process.env.MONGODB_URI_PROTOCOL;
        mongoDatabaseUri += `://`;

        if (userName) {
            mongoDatabaseUri += `${userName}`;
            
            if (password) {
                mongoDatabaseUri += `:${password}`;
            }
            
            mongoDatabaseUri += `@`;
        }

        if (server) {
            mongoDatabaseUri += server;
            mongoDatabaseUri += `:${process.env.MONGODB_URI_PORT}`;
            mongoDatabaseUri += `/${process.env.MONGODB_URI_DATABASE}`;
        } else {
            return "mongodb://127.0.0.1:27017";
        }
        
        return mongoDatabaseUri;
    }
}

export { MongoDbHelper as default };
