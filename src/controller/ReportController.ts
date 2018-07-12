import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { ReportService } from "../service/ReportService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { sprintf } from "sprintf-js";
import { Utils } from "../libs/utils";
import { ReportModel } from "../model/ReportModel";
import { validate } from "class-validator";

@ApiPath({
    path: "/report",
    name: "report"
})
@controller("/api/report")
export class ReportController {
    public static TARGET_NAME: string = "ReportController - 1";
    private reportService = new ReportService();
    private utils = new Utils();
    @ApiOperationGet({
        description: "Search report",
        summary: "Search report",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "report" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async search(request: Request, response: Response, next: NextFunction) {
        const query: ReportModel = new ReportModel(request.query);
        const data = this.utils.createSuccessResponse(await this.reportService.search(query));
        return data;
    }

    @ApiOperationGet({
        description: "Get report by id",
        summary: "Get report by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "report" }
        }
    })
    @httpGet("/byid/:id")
    public async findById(request: Request, response: Response, next: NextFunction) {
        const data = this.utils.createSuccessResponse(await this.reportService.findOne(request.params.id));
        return data;
    }

    @ApiOperationPost({
        description: "Create report object",
        summary: "Create report version",
        parameters: {
            body: { description: "New report", required: true, model: "report" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPut("/")
    public async createOne(request: Request, response: Response, next: NextFunction) {
        const report: ReportModel = new ReportModel(request.body);
        const errors = await validate(report);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.reportService.create(report);
    }

    @ApiOperationPost({
        description: "Update report object",
        summary: "Update report version",
        parameters: {
            body: { description: "Update fields", required: true, model: "report" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update")
    public async updateOne(request: Request, response: Response, next: NextFunction) {
        const report: ReportModel = new ReportModel(request.body);
        const errors = await validate(report);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.reportService.update(request.params.id, report);
    }

    @ApiOperationPost({
        description: "Remove report object",
        summary: "Remove report version",
        parameters: {
            body: { description: "New report", required: true, model: "report" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/delete")
    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.reportService.remove(request.params.id);
    }

    @ApiOperationPost({
        description: "Soft delete report object",
        summary: "Soft delete report version",
        parameters: {
            body: { description: "Id of report", required: true, model: "report" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/softdelete")
    public async softDelete(request: Request, response: Response, next: NextFunction) {
        await this.reportService.softDelete(request.params.id);
    }

    @ApiOperationPost({
        description: "Active report object",
        summary: "Active report version",
        parameters: {
            body: { description: "Id of report", required: true, model: "report" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        await this.reportService.active(request.params.id);
    }
}
