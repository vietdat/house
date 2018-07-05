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

createConnection().then(async () => {
    const container = new Container();
    const passportC = new PassportConfig();
    const log: Log = new Log();
    passportC.init();
    container.bind<interfaces.Controller>(TYPE.Controller)
        .to(UserController).inSingletonScope().whenTargetNamed(UserController.TARGET_NAME);
    // container.bind<interfaces.Controller>(TYPE.Controller)
    //     .to(Auth).inSingletonScope().whenTargetNamed("auth");

    // create server
    const server = new InversifyExpressServer(container);

    server.setConfig((config: any) => {
        config.use("/api-docs/swagger", express.static("swagger"));
        config.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
        config.use(bodyParser.json());
        config.use(swagger.express(
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

    server.setErrorConfig((config: any) => {
        config.use((err: IError, request: express.Request, response: express.Response, next: express.NextFunction) => {
            // console.log(err.err ? err.err : err);
            log.debug(err.err ? err.err : err.toString());
            response.status(err.statusCode ? err.statusCode : 500).send({ success: false, message: err.message ? err.message : "Something fail" });
        });
    });

    const app = server.build();

    console.log(passport.initialize());
    app.use(passport.initialize());
    app.use(passport.session());
    // start express server
    app.listen(5000);

    console.log("Server has started on port 5000.");

}).catch((error) => console.log(error));
