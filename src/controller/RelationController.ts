import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { RelationService } from "../service/RelationService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { sprintf } from "sprintf-js";
import { Utils } from "../libs/utils";
import { RelationModel } from "../model/RelationModel";
import { validate } from "class-validator";

@ApiPath({
    path: "/relation",
    name: "relation"
})
@controller("/relation")
export class RelationController {
    public static TARGET_NAME: string = "RelationController - 1";
    private relationService = new RelationService();
    private utils = new Utils();
    @ApiOperationGet({
        description: "Search Relation",
        summary: "Search Relation",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Relation" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async search(request: Request, response: Response, next: NextFunction) {
        const query: RelationModel = new RelationModel(request.query);
        const data = this.utils.createSuccessResponse(await this.relationService.search(query));
        return data;
    }

    @ApiOperationGet({
        description: "Get relation by id",
        summary: "Get relation by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Relation" }
        }
    })
    @httpGet("/byid/:id")
    public async findById(request: Request, response: Response, next: NextFunction) {
        const data = this.utils.createSuccessResponse(await this.relationService.findOne(request.params.id));
        return data;
    }

    @ApiOperationPost({
        description: "Create relation object",
        summary: "Create relation version",
        parameters: {
            body: { description: "New relation", required: true, model: "relation" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPut("/")
    public async createOne(request: Request, response: Response, next: NextFunction) {
        const report: RelationModel = new RelationModel(request.body);
        const errors = await validate(report);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.relationService.create(report);
    }

    @ApiOperationPost({
        description: "Update relation object",
        summary: "Update relation version",
        parameters: {
            body: { description: "Update fields", required: true, model: "Relation" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update")
    public async updateOne(request: Request, response: Response, next: NextFunction) {
        const report: RelationModel = new RelationModel(request.body);
        const errors = await validate(report);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.relationService.update(request.params.id, report);
    }

    @ApiOperationPost({
        description: "Remove relation object",
        summary: "Remove relation version",
        parameters: {
            body: { description: "New relation", required: true, model: "Relation" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/delete")
    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.relationService.remove(request.params.id);
    }

    @ApiOperationPost({
        description: "Soft delete relation object",
        summary: "Soft delete relation version",
        parameters: {
            body: { description: "Id of relation", required: true, model: "Relation" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/softdelete")
    public async softDelete(request: Request, response: Response, next: NextFunction) {
        await this.relationService.softDelete(request.params.id);
    }

    @ApiOperationPost({
        description: "Active relation object",
        summary: "Active relation version",
        parameters: {
            body: { description: "Id of relation", required: true, model: "Relation" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        await this.relationService.active(request.params.id);
    }
}
