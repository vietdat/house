import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { PropertyService } from "../service/PropertyService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { sprintf } from "sprintf-js";
import { Utils } from "../libs/utils";
import { PropertyModel } from "../model/PropertyModel";
import { validate } from "class-validator";

@ApiPath({
    path: "/property",
    name: "property"
})
@controller("/property")
export class PropertyController {
    public static TARGET_NAME: string = "PropertyController - 1";
    private propertyService = new PropertyService();
    private utils = new Utils();
    @ApiOperationGet({
        description: "Search property",
        summary: "Search property",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Property" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async search(request: Request, response: Response, next: NextFunction) {
        const query: PropertyModel = new PropertyModel(request.query);
        const data = this.utils.createSuccessResponse(await this.propertyService.search(query));
        return data;
    }

    @ApiOperationGet({
        description: "Get property by id",
        summary: "Get property by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Property" }
        }
    })
    @httpGet("/byid/:id")
    public async findById(request: Request, response: Response, next: NextFunction) {
        const data = this.utils.createSuccessResponse(await this.propertyService.findOne(request.params.id));
        return data;
    }

    @ApiOperationPost({
        description: "Create property object",
        summary: "Create property version",
        parameters: {
            body: { description: "New property", required: true, model: "Property" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPut("/")
    public async createOne(request: Request, response: Response, next: NextFunction) {
        const property: PropertyModel = new PropertyModel(request.body);
        const errors = await validate(property);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.propertyService.create(property);
    }

    @ApiOperationPost({
        description: "Update property object",
        summary: "Update property version",
        parameters: {
            body: { description: "Update fields", required: true, model: "Property" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update")
    public async updateOne(request: Request, response: Response, next: NextFunction) {
        const property: PropertyModel = new PropertyModel(request.body);
        const errors = await validate(property);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.propertyService.update(request.params.id, property);
    }

    @ApiOperationPost({
        description: "Remove property object",
        summary: "Remove property version",
        parameters: {
            body: { description: "New property", required: true, model: "Property" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/delete")
    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.propertyService.remove(request.params.id);
    }

    @ApiOperationPost({
        description: "Soft delete property object",
        summary: "Soft delete property version",
        parameters: {
            body: { description: "Id of property", required: true, model: "Property" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/softdelete")
    public async softDelete(request: Request, response: Response, next: NextFunction) {
        await this.propertyService.softDelete(request.params.id);
    }

    @ApiOperationPost({
        description: "Active property object",
        summary: "Active property version",
        parameters: {
            body: { description: "Id of property", required: true, model: "Property" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        await this.propertyService.active(request.params.id);
    }
}
