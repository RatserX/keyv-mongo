class MongoDbHelper {
    public static getConnectionStringUri = (host?: string, username?: string, password?: string, port?: string, defaultauthdb?: string): string => {
        let connectionStringUri = "";

        if (host == null) {
            return "mongodb://127.0.0.1:27017";
        }
  
        if (username != null) {
            connectionStringUri += username;
  
            if (password != null) {
                connectionStringUri += `:${username}`;
            }
  
            connectionStringUri += "@";
        }
  
        connectionStringUri += host;
  
        if (port != null) {
            connectionStringUri += `:${port}`;
        }
  
        if (defaultauthdb != null) {
            connectionStringUri += `/${defaultauthdb}`;
        }
  
        return connectionStringUri;
    };
}

export { MongoDbHelper as default };
