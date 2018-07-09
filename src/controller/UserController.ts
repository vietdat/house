import { NextFunction, Request, Response, json } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationPut } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { UserService } from "../service/UserService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import * as passport from "passport";
import { sprintf } from "sprintf-js";
import { PassportConfig } from "../libs/passport";

@ApiPath({
    path: "/api/user",
    name: "user"
})
@controller("/api/user")
export class UserController {
    private passportC = new PassportConfig();

    // tslint:disable-next-line:member-ordering
    public static TARGET_NAME: string = "UserController - 1";
    private userService = new UserService();

    @ApiOperationPut({
        description: "Add new user",
        summary: "Add new user",
        path: "/",
        parameters: {
            body: { description: "New user", required: true, model: "User" }
        },
        responses: {
            200: {description: "Success"},
            400: { description: "Something fail" }
        }
    })
    @httpPut("/")
    public async create(request: Request, response: Response, next: NextFunction) {
        return this.userService.create(request.body);
    }

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
    @httpGet("/search")
    public async all(request: Request, response: Response, next: NextFunction) {
        try {
            return response.json({ success: true, data: this.userService.search() });
        } catch (err) {
            return next({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.ACCEPTED, "sadf"), err });
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
    public async one(request: Request, response: Response, next: NextFunction) {
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

    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.userService.remove(request.params.id);
    }
}
