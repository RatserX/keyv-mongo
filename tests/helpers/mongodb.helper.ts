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

        let mongoDbUri = process.env.MONGODB_URI_PROTOCOL;
        mongoDbUri += `://`;

        if (userName) {
            mongoDbUri += `${userName}`;
            
            if (password) {
                mongoDbUri += `:${password}`;
            }
            
            mongoDbUri += `@`;
        }

        if (server) {
            mongoDbUri += server;
            mongoDbUri += `:${process.env.MONGODB_URI_PORT}`;
            mongoDbUri += `/${process.env.MONGODB_URI_DATABASE}`;
        } else {
            return "mongodb://127.0.0.1:27017";
        }
        
        return mongoDbUri;
    }
}

export { MongoDbHelper as default };
