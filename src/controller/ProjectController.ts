import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { ProjectService } from "../service/ProjectService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { sprintf } from "sprintf-js";
import { Utils } from "../libs/utils";
import { ProjectModel } from "../model/ProjectModel";
import { validate } from "class-validator";

@ApiPath({
    path: "/project",
    name: "project"
})
@controller("/project")
export class ProjectController {
    public static TARGET_NAME: string = "ProjectController - 1";
    private projectService = new ProjectService();
    private utils = new Utils();
    @ApiOperationGet({
        description: "Get users objects list",
        summary: "Get users list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Project" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async search(request: Request, response: Response, next: NextFunction) {
        const query: ProjectModel = new ProjectModel(request.query);
        const data = this.utils.createSuccessResponse(await this.projectService.search(query));
        return data;
    }

    @ApiOperationGet({
        description: "Get project by id",
        summary: "Get project by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User" }
        }
    })
    @httpGet("/byid/:id")
    public async findById(request: Request, response: Response, next: NextFunction) {
        const data = this.utils.createSuccessResponse(await this.projectService.findOne(request.params.id));
        return data;
    }

    @ApiOperationPost({
        description: "Post project object",
        summary: "Post project version",
        parameters: {
            body: { description: "New project", required: true, model: "Project" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPut("/")
    public async createOne(request: Request, response: Response, next: NextFunction) {
        const project: ProjectModel = new ProjectModel(request.body);
        const errors = await validate(project);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.projectService.create(project);
    }

    @ApiOperationPost({
        description: "Update project object",
        summary: "Update project version",
        parameters: {
            body: { description: "Update fields", required: true, model: "Project" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update")
    public async updateOne(request: Request, response: Response, next: NextFunction) {
        const project: ProjectModel = new ProjectModel(request.body);
        const errors = await validate(project);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.projectService.update(request.params.id, project);
    }

    @ApiOperationPost({
        description: "Remove project object",
        summary: "Remove project version",
        parameters: {
            body: { description: "New project", required: true, model: "Project" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/delete")
    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.projectService.remove(request.params.id);
    }

    @ApiOperationPost({
        description: "Soft delete project object",
        summary: "Soft delete project version",
        parameters: {
            body: { description: "Id of project", required: true, model: "Project" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update")
    public async softDelete(request: Request, response: Response, next: NextFunction) {
        await this.projectService.softDelete(request.params.id);
    }

    @ApiOperationPost({
        description: "Active project object",
        summary: "Active project version",
        parameters: {
            body: { description: "Id of project", required: true, model: "Project" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        await this.projectService.active(request.params.id);
    }
}
