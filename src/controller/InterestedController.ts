import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { InterestedService } from "../service/InterestedService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { sprintf } from "sprintf-js";
import { Utils } from "../libs/utils";
import { InterestedModel } from "../model/InterestedModel";
import { validate } from "class-validator";

@ApiPath({
    path: "/interested",
    name: "interested"
})
@controller("/api/interested")
export class InterestedController {
    public static TARGET_NAME: string = "InterestedController - 1";
    private interestedService = new InterestedService();
    private utils = new Utils();
    @ApiOperationGet({
        description: "Search interested",
        summary: "Search interested",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Interested" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async search(request: Request, response: Response, next: NextFunction) {
        const query: InterestedModel = new InterestedModel(request.query);
        const data = this.utils.createSuccessResponse(await this.interestedService.search(query));
        return data;
    }

    @ApiOperationGet({
        description: "Get interested by id",
        summary: "Get interested by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Interested" }
        }
    })
    @httpGet("/byid/:id")
    public async findById(request: Request, response: Response, next: NextFunction) {
        const data = this.utils.createSuccessResponse(await this.interestedService.findOne(request.params.id));
        return data;
    }

    @ApiOperationPost({
        description: "Create interested object",
        summary: "Create interested version",
        parameters: {
            body: { description: "New interested", required: true, model: "Interested" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPut("/")
    public async createOne(request: Request, response: Response, next: NextFunction) {
        const interested: InterestedModel = new InterestedModel(request.body);
        const errors = await validate(interested);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.interestedService.create(interested);
    }

    @ApiOperationPost({
        description: "Update interested object",
        summary: "Update interested version",
        parameters: {
            body: { description: "Update fields", required: true, model: "Interested" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update")
    public async updateOne(request: Request, response: Response, next: NextFunction) {
        const interested: InterestedModel = new InterestedModel(request.body);
        const errors = await validate(interested);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.interestedService.update(request.params.id, interested);
    }

    @ApiOperationPost({
        description: "Remove interested object",
        summary: "Remove interested version",
        parameters: {
            body: { description: "New interested", required: true, model: "Interested" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/delete")
    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.interestedService.remove(request.params.id);
    }

    @ApiOperationPost({
        description: "Soft delete interested object",
        summary: "Soft delete interested version",
        parameters: {
            body: { description: "Id of interested", required: true, model: "Interested" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/softdelete")
    public async softDelete(request: Request, response: Response, next: NextFunction) {
        await this.interestedService.softDelete(request.params.id);
    }

    @ApiOperationPost({
        description: "Active interested object",
        summary: "Active interested version",
        parameters: {
            body: { description: "Id of interested", required: true, model: "Interested" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        await this.interestedService.active(request.params.id);
    }
}
