import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, interfaces, httpPost } from "inversify-express-utils";

@ApiPath({
    path: "/user",
    name: "user"
})
@controller("/users")
export class UserController implements interfaces.Controller {

    private userRepository = getRepository(User);
    public static TARGET_NAME: string = "UserController - 1";

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
        return this.userRepository.find();
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
        return this.userRepository.findOne(request.params.id);
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
        try {
            let instance = await this.userRepository.create(request.body);
            return await this.userRepository.insert(instance);
        } catch (err) {
            response.json(err);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        await this.userRepository.remove(request.params.id);
    }

}