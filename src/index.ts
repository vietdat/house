import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as swagger from "swagger-express-ts";
import { Container } from "inversify";
import { SmsController } from "./controller/SmsController";
import * as passport from "passport";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { IError } from "./libs/error";
import { Log } from "./libs/log";

createConnection().then(async () => {
    const container = new Container();
    const log: Log = new Log();
    container.bind<interfaces.Controller>(TYPE.Controller)
        .to(SmsController).inSingletonScope().whenTargetNamed(SmsController.TARGET_NAME);

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
    });

    // tslint:disable-next-line:no-shadowed-variable
    server.setErrorConfig((app: any) => {
        app.use((err: IError, request: express.Request, response: express.Response, next: express.NextFunction) => {
            console.log(err.err ? err.err : err);
            log.debug(err.err ? err.err : err.toString());
            response.status(err.statusCode ? err.statusCode : 500).send({ success: false, message: err.message ? err.message : "Something fail" });
        });
    });
    const app = server.build();
    console.log(passport.initialize());

    app.listen(5003);
    console.log("Server has started on port 5003.");
}).catch((error) => console.log(error));
