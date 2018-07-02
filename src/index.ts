import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as swagger from "swagger-express-ts";
import { Container } from "inversify";
import { UserController } from "./controller/UserController";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { Error } from "../src/libs/error";

createConnection().then(async connection => {
    const container = new Container();

    container.bind<interfaces.Controller>(TYPE.Controller)
        .to(UserController).inSingletonScope().whenTargetNamed(UserController.TARGET_NAME);

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
        app.use((err: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
            console.log(err.err ? err.err : err);
            response.status(err.statusCode ? err.statusCode : 500).send({success: false, message: err.message ? err.message : 'Something fail'});
        });
    });

    const app = server.build();

    // start express server
    app.listen(3000);

    console.log("Server has started on port 3000.");

}).catch(error => console.log(error));
