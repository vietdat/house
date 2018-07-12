import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { TransactionService } from "../service/TransactionService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { sprintf } from "sprintf-js";
import { Utils } from "../libs/utils";
import { TransactionModel } from "../model/TransactionModel";
import { validate } from "class-validator";

@ApiPath({
    path: "/transaction",
    name: "transaction"
})
@controller("/transaction")
export class TransactionController {
    public static TARGET_NAME: string = "TransactionController - 1";
    private transactionService = new TransactionService();
    private utils = new Utils();
    @ApiOperationGet({
        description: "Search transaction",
        summary: "Search transaction",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "transaction" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async search(request: Request, response: Response, next: NextFunction) {
        const query: TransactionModel = new TransactionModel(request.query);
        const data = this.utils.createSuccessResponse(await this.transactionService.search(query));
        return data;
    }

    @ApiOperationGet({
        description: "Get transaction by id",
        summary: "Get transaction by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "transaction" }
        }
    })
    @httpGet("/byid/:id")
    public async findById(request: Request, response: Response, next: NextFunction) {
        const data = this.utils.createSuccessResponse(await this.transactionService.findOne(request.params.id));
        return data;
    }

    @ApiOperationPost({
        description: "Create transaction object",
        summary: "Create transaction version",
        parameters: {
            body: { description: "New transaction", required: true, model: "transaction" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPut("/")
    public async createOne(request: Request, response: Response, next: NextFunction) {
        const transaction: TransactionModel = new TransactionModel(request.body);
        const errors = await validate(transaction);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.transactionService.create(transaction);
    }

    @ApiOperationPost({
        description: "Update transaction object",
        summary: "Update transaction version",
        parameters: {
            body: { description: "Update fields", required: true, model: "transaction" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update")
    public async updateOne(request: Request, response: Response, next: NextFunction) {
        const transaction: TransactionModel = new TransactionModel(request.body);
        const errors = await validate(transaction);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.transactionService.update(request.params.id, transaction);
    }

    @ApiOperationPost({
        description: "Remove transaction object",
        summary: "Remove transaction version",
        parameters: {
            body: { description: "New transaction", required: true, model: "transaction" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/delete")
    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.transactionService.remove(request.params.id);
    }
}
