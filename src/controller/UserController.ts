import { NextFunction, Request, Response, json } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationPut } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { UserService } from "../service/UserService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import * as passport from "passport";
import { sprintf } from "sprintf-js";
import { stringify } from "querystring";
import { PassportConfig } from "../libs/passport";
import { Utils } from "../libs/utils";
import { Constant } from "../all/constant";

@ApiPath({
    path: "/api/user",
    name: "user"
})
@controller("/api/user")
export class UserController {
    public static TARGET_NAME: string = "UserController - 1";
    private utils = new Utils();
    private userService = new UserService();

    @ApiOperationPut({
        description: "Add new user",
        summary: "Add new user",
        path: "/",
        parameters: {
            body: { description: "New user", required: true, model: "User" }
        },
        responses: {
            200: { description: "Success" },
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
        return response.json({ success: true, data: await this.userService.search(request.query) });
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
    @httpGet("/byId/:userId")
    public async findById(request: Request, response: Response, next: NextFunction) {
        return this.userService.findOne(request.params.id);
    }

    @ApiOperationPost({
        description: "Active user by id",
        summary: "Active user by id",
        path: "/{id}/active",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User" }
        }
    })
    @httpPost("/:userId/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.userService.active(request.params.userId) });
    }

    @ApiOperationPost({
        description: "softdelete user by id",
        summary: "softdelete user by id",
        path: "/{id}/softdelete",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User" }
        }
    })
    @httpPost("/:userId/softdelete")
    public async softdelete(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.userService.softdelete(request.params.userId) });
    }

    @ApiOperationPost({
        description: "Update user",
        summary: "Update user",
        path: "/{id}/update",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User" }
        }
    })
    @httpPost("/:userId/update")
    public async update(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.userService.update(request.params.userId, request.body) });
    }

    @ApiOperationGet({
        description: "Get wallet of user",
        summary: "Get wallet of user",
        path: "/wallet",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User" }
        }
    })
    @httpGet("/wallet", passport.authenticate("jwt", { session: false }))
    public async getWallet(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.userService.getWallet(request.user.walletId) });
    }

    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.userService.remove(request.params.id);
    }

    @httpPut("/project")
    public async createProperty(request: Request, response: Response, next: NextFunction) {
        let property;
        let url;
        url = sprintf(Constant.API_CREATE, "project");
        property = await this.utils.putAPI(url, request.body);
        return this.utils.createSuccessHandler(property);
    }

    @httpPost("/:id/project")
    public async updateProperty(request: Request, response: Response, next: NextFunction) {
        let property;
        let url;
        url = sprintf(Constant.API_UPDATE_BY_ID, "project", request.params.id);
        property = await this.utils.postAPI(url, request.body);
        return this.utils.createSuccessHandler(property);
    }

    @httpGet("/project/byid/:id")
    public async findPropertyById(request: Request, response: Response, next: NextFunction) {
        let property;
        let url;
        url = sprintf(Constant.API_GET_BY_ID, "project", request.params.id);
        property = await this.utils.getAPI(url);
        return this.utils.createSuccessHandler(property);
    }

    @httpGet("/project/search")
    public async searchProperty(request: Request, response: Response, next: NextFunction) {
        let property;
        let url;
        url = sprintf(Constant.API_SEARCH, "project", stringify(request.query));
        property = await this.utils.getAPI(url);
        return this.utils.createSuccessHandler(property);
    }
}
