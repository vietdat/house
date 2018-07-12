import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { PropertyTypeService } from "../service/PropertyTypeService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { sprintf } from "sprintf-js";
import { Utils } from "../libs/utils";
import { PropertyTypeModel } from "../model/PropertyTypeModel";
import { validate } from "class-validator";

@ApiPath({
    path: "/propertytype",
    name: "propertytype"
})
@controller("/propertytype")
export class PropertyTypeController {
    public static TARGET_NAME: string = "PropertyTypeController - 1";
    private propertyTypeService = new PropertyTypeService();
    private utils = new Utils();
    @ApiOperationGet({
        description: "Search property type",
        summary: "Search property type",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "propertyType" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async search(request: Request, response: Response, next: NextFunction) {
        const query: PropertyTypeModel = new PropertyTypeModel(request.query);
        const data = this.utils.createSuccessResponse(await this.propertyTypeService.search(query));
        return data;
    }

    @ApiOperationGet({
        description: "Get property type by id",
        summary: "Get property type by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "propertyType" }
        }
    })
    @httpGet("/byid/:id")
    public async findById(request: Request, response: Response, next: NextFunction) {
        const data = this.utils.createSuccessResponse(await this.propertyTypeService.findOne(request.params.id));
        return data;
    }

    @ApiOperationPost({
        description: "Create property type object",
        summary: "Create property type version",
        parameters: {
            body: { description: "New property type", required: true, model: "propertyType" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPut("/")
    public async createOne(request: Request, response: Response, next: NextFunction) {
        const propertyType: PropertyTypeModel = new PropertyTypeModel(request.body);
        const errors = await validate(propertyType);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.propertyTypeService.create(propertyType);
    }

    @ApiOperationPost({
        description: "Update property type object",
        summary: "Update property type version",
        parameters: {
            body: { description: "Update fields", required: true, model: "propertyType" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update")
    public async updateOne(request: Request, response: Response, next: NextFunction) {
        const propertyType: PropertyTypeModel = new PropertyTypeModel(request.body);
        const errors = await validate(propertyType);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.propertyTypeService.update(request.params.id, propertyType);
    }

    @ApiOperationPost({
        description: "Remove property type object",
        summary: "Remove property type version",
        parameters: {
            body: { description: "New property type", required: true, model: "propertyType" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/delete")
    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.propertyTypeService.remove(request.params.id);
    }

    @ApiOperationPost({
        description: "Soft delete property type object",
        summary: "Soft delete property type version",
        parameters: {
            body: { description: "Id of property type", required: true, model: "propertyType" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/softdelete")
    public async softDelete(request: Request, response: Response, next: NextFunction) {
        await this.propertyTypeService.softDelete(request.params.id);
    }

    @ApiOperationPost({
        description: "Active property type object",
        summary: "Active property type version",
        parameters: {
            body: { description: "Id of property type", required: true, model: "propertyType" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        await this.propertyTypeService.active(request.params.id);
    }
}
