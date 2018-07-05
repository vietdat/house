import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as swagger from "swagger-express-ts";
import { Container } from "inversify";

import { UserController } from "./controller/UserController";
import { Auth } from "./controller/Auth";

import * as passport from "passport";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { IError } from "../src/libs/error";
import { PassportConfig } from "./libs/passport";
import { Log } from "./libs/log";

import * as https from "https";
import * as fs from "fs";

createConnection().then(async connection => {
    const container = new Container();
    const passportC = new PassportConfig();
    let log: Log = new Log();
    passportC.init();
    container.bind<interfaces.Controller>(TYPE.Controller)
        .to(UserController).inSingletonScope().whenTargetNamed(UserController.TARGET_NAME);
    container.bind<interfaces.Controller>(TYPE.Controller)
        .to(Auth).inSingletonScope().whenTargetNamed("auth");

    // create server
    const server = new InversifyExpressServer(container);

    server.setConfig((app: any) => {
        app.use('/api-docs/swagger', express.static('swagger'));
        app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
        app.use(bodyParser.json());
        app.use(swagger.express(
            {
                definition: {
                    info: {
                        title: "My api",
                        version: "1.0"
                    },
                    externalDocs: {
                        url: ""
                    }
                }
            }
        ));
    });

    server.setErrorConfig((app: any) => {
        app.use((err: IError, request: express.Request, response: express.Response, next: express.NextFunction) => {
            // console.log(err.err ? err.err : err);
            log.debug(err.err ? err.err : err.toString());
            response.status(err.statusCode ? err.statusCode : 500).send({ success: false, message: err.message ? err.message : 'Something fail' });
        });
    });


    const app = server.build();

    console.log(passport.initialize());
    app.use(passport.initialize());
    app.use(passport.session());
    // start express server

    const options = {
        key: fs.readFileSync("../../key-20180704-112014.pem"),
        cert: fs.readFileSync("../../cert-20180704-112014.crt"),
        requestCert: false,
        rejectUnauthorized: false
    };

    https.createServer(options, app).listen(5000);

    // app.listen(5000);

    console.log("Server has started on port 5000.");

}).catch(error => console.log(error));
