import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { WalletService } from "../service/WalletService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { sprintf } from "sprintf-js";
import { Utils } from "../libs/utils";
import { WalletModel } from "../model/WalletModel";
import { validate } from "class-validator";
import { Authenticate } from "../libs/authenticate";

@ApiPath({
    path: "/wallet",
    name: "wallet"
})
@controller("/api/wallet")
export class WalletController {
    public static TARGET_NAME: string = "WalletController - 1";
    private walletService = new WalletService();
    private utils = new Utils();
    @ApiOperationGet({
        description: "Get wallet objects list",
        summary: "Get users list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Wallet" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search", new Authenticate().authInternalToken)
    public async search(request: Request, response: Response, next: NextFunction) {
        const query: WalletModel = new WalletModel(request.query);
        const data = this.utils.createSuccessResponse(await this.walletService.search(query));
        return data;
    }

    @ApiOperationGet({
        description: "Get wallet by id",
        summary: "Get wallet by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User" }
        }
    })
    @httpGet("/byid/:id", new Authenticate().authInternalToken)
    public async findById(request: Request, response: Response, next: NextFunction) {
        const data = this.utils.createSuccessResponse(await this.walletService.findOne(request.params.id));
        return data;
    }

    @ApiOperationPost({
        description: "Post wallet object",
        summary: "Post wallet version",
        parameters: {
            body: { description: "New wallet", required: true, model: "Wallet" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPut("/", new Authenticate().authInternalToken)
    public async createOne(request: Request, response: Response, next: NextFunction) {
        const wallet: WalletModel = new WalletModel(request.body);
        const errors = await validate(wallet);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.walletService.create(wallet);
    }

    @ApiOperationPost({
        description: "Update wallet object",
        summary: "Update wallet version",
        parameters: {
            body: { description: "Update fields", required: true, model: "Wallet" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update", new Authenticate().authInternalToken)
    public async updateOne(request: Request, response: Response, next: NextFunction) {
        const wallet: WalletModel = new WalletModel(request.body);
        const errors = await validate(wallet);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.walletService.update(request.params.id, wallet);
    }

    @ApiOperationPost({
        description: "Remove wallet object",
        summary: "Remove wallet version",
        parameters: {
            body: { description: "New wallet", required: true, model: "Wallet" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/delete", new Authenticate().authInternalToken)
    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.walletService.remove(request.params.id);
    }

    @ApiOperationPost({
        description: "Soft delete wallet object",
        summary: "Soft delete wallet version",
        parameters: {
            body: { description: "Id of wallet", required: true, model: "Wallet" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/softDelete", new Authenticate().authInternalToken)
    public async softDelete(request: Request, response: Response, next: NextFunction) {
        await this.walletService.softDelete(request.params.id);
    }

    @ApiOperationPost({
        description: "Active wallet object",
        summary: "Active wallet version",
        parameters: {
            body: { description: "Id of wallet", required: true, model: "Wallet" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/active", new Authenticate().authInternalToken)
    public async active(request: Request, response: Response, next: NextFunction) {
        await this.walletService.active(request.params.id);
    }
}
