export class Environment {
    url: string;
    port: number;
    secret: string;

    constructor(url: string, port: number, secret: string) {
        this.url = url;
        this.port = port;
        this.secret = secret;
    }

    getDbUrl() {
        return this.url;
    }

    getPort() {
        return this.port;
    }

    getJwtSecret() {
        return this.secret;
    }
}

export function getEnvironment(env: string) {
    let environment;
    switch (env) {
        case "dev": {
            environment = new Environment("postgres://paoizvqi:YGcp43jmw_rsm6PMye638JwcjzRLpA86@pellefant.db.elephantsql.com:5432/paoizvqi", 5000, "Fami@123@123");
            break;
        }
        case "alpha": {
            environment = new Environment("postgres://paoizvqi:YGcp43jmw_rsm6PMye638JwcjzRLpA86@pellefant.db.elephantsql.com:5432/paoizvqi", 5000, "Fami@123@123");
            break;
        }
        case "beta": {
            environment = new Environment("postgres://paoizvqi:YGcp43jmw_rsm6PMye638JwcjzRLpA86@pellefant.db.elephantsql.com:5432/paoizvqi", 5000, "Fami@123@123");
            break;
        }
        case "production": {
            environment = new Environment("postgres://paoizvqi:YGcp43jmw_rsm6PMye638JwcjzRLpA86@pellefant.db.elephantsql.com:5432/paoizvqi", 5000, "Fami@123@123");
            break;
        }
    }

    return environment;
}
