import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as swagger from "swagger-express-ts";
import { Container } from "inversify";

import { ProjectController } from "./controller/ProjectController";
// import { Auth } from "./controller/Auth";

import * as passport from "passport";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { IError } from "../src/libs/error";
import { Log } from "./libs/log";

import * as https from "https";
import * as fs from "fs";

createConnection().then(async () => {
    const container = new Container();
    const log: Log = new Log();
    container.bind<interfaces.Controller>(TYPE.Controller)
        .to(ProjectController).inSingletonScope().whenTargetNamed(ProjectController.TARGET_NAME);
    // container.bind<interfaces.Controller>(TYPE.Controller)
        // .to(Auth).inSingletonScope().whenTargetNamed("auth");
    // create server
    const server = new InversifyExpressServer(container);
    // tslint:disable-next-line:no-shadowed-variable
    server.setConfig((app: any) => {
        app.use("/api-docs/swagger", express.static("swagger"));
        app.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
        app.use(bodyParser.json());
        app.use(swagger.express({
            definition: {
                info: {
                    title: "My api",
                    version: "1.0"
                },
                externalDocs: {
                    url: ""
                }
            }
        }));
        app.use(passport.initialize());
        app.use(passport.session());
    });
    // tslint:disable-next-line:no-shadowed-variable
    server.setErrorConfig((app: any) => {
        app.use((err: IError, request: express.Request, response: express.Response, next: express.NextFunction) => {
            log.debug(err ? err.message : err.toString());
            response.status(err.statusCode ? err.statusCode : 500).send({ success: false, message: err.message ? err.message : "Something fail" });
        });
    });
    const app = server.build();
    console.log(passport.initialize());

    // start express server
    // const options = {
    //     key: fs.readFileSync("../../key-20180704-112014.pem"),
    //     cert: fs.readFileSync("../../cert-20180704-112014.crt"),
    //     requestCert: false,
    //     rejectUnauthorized: false
    // };
    // https.createServer(options, app).listen(5000);
    app.listen(5000);
    console.log("Server has started on port 5000.");
}).catch((error) => console.log(error));
