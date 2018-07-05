import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { UserService } from "../service/UserService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
// import * as passport from "passport";
import { sprintf } from "sprintf-js";
import { passportConfig } from "../libs/passport";
// import { getLogger, Logger  } from 'log4js';

@ApiPath({
    path: "/user",
    name: "user"
})
@controller("/users")
export class UserController {
    private passportC = new passportConfig();
    public static TARGET_NAME: string = "UserController - 1";
    private userService = new UserService();

    @ApiOperationGet({
        description: "Get users objects list",
        summary: "Get users list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/")
    async all(request: Request, response: Response, next: NextFunction) {
        try {
            return response.json({success: true, data: await this.userService.search()});
        } catch(err) {
            return next({statusCode: StatusCode.ACCEPTED, message: sprintf(Message.ACCEPTED, 'sadf'), err: err});
        }
    }

    @ApiOperationGet({
        description: "Get user by id",
        summary: "Get user by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User" }
        }
    })
    @httpGet("/{userId}")
    async one(request: Request, response: Response, next: NextFunction) {
        return this.userService.findOne(request.params.id);
    }

    @ApiOperationPost({
        description: "Post user object",
        summary: "Post user version",
        parameters: {
            body: { description: "New user", required: true, model: "User" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/")
    async save(request: Request, response: Response, next: NextFunction) {
        return this.userService.create(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        await this.userService.remove(request.params.id);
    }
}