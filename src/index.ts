import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import * as swagger from "swagger-express-ts";
import { SwaggerDefinitionConstant } from "swagger-express-ts";
import { Routes } from "./route/user.routes";
import { User } from "./entity/User";
import { Container } from "inversify";
import { UserController } from "./controller/UserController";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";

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
            console.error(err.stack);
            response.status(500).send("Something broke!");
        });
    });

    const app = server.build();

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000.");

}).catch(error => console.log(error));
