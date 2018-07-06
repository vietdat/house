import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { Controller, Req, Res, Get, Put, Post, Delete } from "routing-controllers";
import { UserService } from "../service/UserService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
// import * as passport from "passport";
import { sprintf } from "sprintf-js";
import { PassportConfig } from "../libs/passport";
import { injectable } from "inversify";
// import { getLogger, Logger  } from "log4js";

@ApiPath({
    path: "/user",
    name: "user",
})
@Controller()
export class UserController {
    public static TARGET_NAME: string = "UserController - 1";
    private passportC = new PassportConfig();
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
    @Get("/search")
    public async search(@Req() request: any, @Res() response: any) {
        try {
            return response.json({ success: true, data: await this.userService.search() });
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.ACCEPTED, "error"), err });
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
    @Get("/byid/:userId")
    public async findById(request: Request, response: Response) {
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
    @Put("/")
    public async createOne(request: Request, response: Response) {
        return this.userService.create(request.body);
    }

    @ApiOperationGet({
        description: "Delete user",
        summary: "Delete user by id",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User" }
        },
        security: {
            apiKeyHeader: []
        }
    })

    @Delete("/:id/delete")
    public async deleteOne(request: Request, response: Response, next: NextFunction) {
        await this.userService.remove(request.params.id);
    }

    @ApiOperationGet({
        description: "Soft delete user",
        summary: "Soft delete user by id",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User" }
        },
        security: {
            apiKeyHeader: []
        }
    })

    @Post("/:id/softdelete")
    public async softDeleteOne(request: Request, response: Response, next: NextFunction) {
        await this.userService.update(request.params.id);
    }
}