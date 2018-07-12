import { NextFunction, Request, Response } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { CommentService } from "../service/CommentService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { sprintf } from "sprintf-js";
import { Utils } from "../libs/utils";
import { CommentModel } from "../model/CommentModel";
import { validate } from "class-validator";

@ApiPath({
    path: "/comment",
    name: "comment"
})
@controller("/comment")
export class CommentController {
    public static TARGET_NAME: string = "CommentController - 1";
    private commentService = new CommentService();
    private utils = new Utils();
    @ApiOperationGet({
        description: "Search comment",
        summary: "Search comment",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Comment" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async search(request: Request, response: Response, next: NextFunction) {
        const query: CommentModel = new CommentModel(request.query);
        const data = this.utils.createSuccessResponse(await this.commentService.search(query));
        return data;
    }

    @ApiOperationGet({
        description: "Get comment by id",
        summary: "Get comment by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Comment" }
        }
    })
    @httpGet("/byid/:id")
    public async findById(request: Request, response: Response, next: NextFunction) {
        const data = this.utils.createSuccessResponse(await this.commentService.findOne(request.params.id));
        return data;
    }

    @ApiOperationPost({
        description: "Create comment object",
        summary: "Create comment version",
        parameters: {
            body: { description: "New comment", required: true, model: "Comment" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPut("/")
    public async createOne(request: Request, response: Response, next: NextFunction) {
        const comment: CommentModel = new CommentModel(request.body);
        const errors = await validate(comment);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.commentService.create(comment);
    }

    @ApiOperationPost({
        description: "Update comment object",
        summary: "Update comment version",
        parameters: {
            body: { description: "Update fields", required: true, model: "Comment" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/update")
    public async updateOne(request: Request, response: Response, next: NextFunction) {
        const comment: CommentModel = new CommentModel(request.body);
        const errors = await validate(comment);
        if (errors.length > 0) {
            throw new Error("validation failed. errors: " + errors);
        }
        return this.commentService.update(request.params.id, comment);
    }

    @ApiOperationPost({
        description: "Remove comment object",
        summary: "Remove comment version",
        parameters: {
            body: { description: "New comment", required: true, model: "Comment" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/delete")
    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.commentService.remove(request.params.id);
    }

    @ApiOperationPost({
        description: "Soft delete comment object",
        summary: "Soft delete comment version",
        parameters: {
            body: { description: "Id of comment", required: true, model: "Comment" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/softdelete")
    public async softDelete(request: Request, response: Response, next: NextFunction) {
        await this.commentService.softDelete(request.params.id);
    }

    @ApiOperationPost({
        description: "Active comment object",
        summary: "Active comment version",
        parameters: {
            body: { description: "Id of comment", required: true, model: "Comment" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/:id/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        await this.commentService.active(request.params.id);
    }
}
