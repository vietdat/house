import { NextFunction, Request, Response, json } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationPut } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { StaffService } from "../service/StaffService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import * as passport from "passport";
import { sprintf } from "sprintf-js";
import { stringify } from "querystring";
import { PassportConfig } from "../libs/passport";
import { Utils } from "../libs/utils";
import { Constant } from "../all/constant";
import { CallService } from "../service/CallService";

@ApiPath({
    path: "/api/staff",
    name: "staff"
})
@controller("/api/staff")
export class StaffController {
    public static TARGET_NAME: string = "StaffController - 1";
    private utils = new Utils();
    private staffService = new StaffService();
    private callService = new CallService();
    @ApiOperationPut({
        description: "Add new staff",
        summary: "Add new staff",
        path: "/",
        parameters: {
            body: { description: "New staff", required: true, model: "Staff" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Something fail" }
        }
    })
    @httpPut("/")
    public async create(request: Request, response: Response, next: NextFunction) {
        return this.staffService.create(request.body);
    }

    @ApiOperationGet({
        description: "Get staffs objects list",
        summary: "Get staffs list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Staff" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async all(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.staffService.search(request.query) });
    }

    @ApiOperationGet({
        description: "Get staff by id",
        summary: "Get staff by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Staff" }
        }
    })
    @httpGet("/byId/:staffId")
    public async findById(request: Request, response: Response, next: NextFunction) {
        return this.staffService.findOne(request.params.id);
    }

    @ApiOperationPost({
        description: "Active staff by id",
        summary: "Active staff by id",
        path: "/{id}/active",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Staff" }
        }
    })
    @httpPost("/:staffId/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.staffService.active(request.params.staffId) });
    }

    @ApiOperationPost({
        description: "softdelete staff by id",
        summary: "softdelete staff by id",
        path: "/{id}/softdelete",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Staff" }
        }
    })
    @httpPost("/:staffId/softdelete")
    public async softdelete(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.staffService.softdelete(request.params.staffId) });
    }

    @ApiOperationPost({
        description: "Update staff",
        summary: "Update staff",
        path: "/{id}/update",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Staff" }
        }
    })
    @httpPost("/:staffId/update")
    public async update(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.staffService.update(request.params.staffId, request.body) });
    }

    @ApiOperationGet({
        description: "Get wallet of staff",
        summary: "Get wallet of staff",
        path: "/wallet",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Staff" }
        }
    })
    @httpGet("/wallet", passport.authenticate("jwt", { session: false }))
    public async getWallet(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.staffService.getWallet(request.user.walletId) });
    }

    public async remove(request: Request, response: Response, next: NextFunction) {
        await this.staffService.remove(request.params.id);
    }

    @httpPut("/comment")
    public async createComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("comment", request);
        return data;
    }

    @httpPost("/:id/comment")
    public async updateComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("comment", request);
        return data;
    }

    @httpGet("/comment/byid/:id")
    public async findCommentById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("comment", request);
        return data;
    }

    @httpGet("/comment/search")
    public async searchComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("comment", request);
        return data;
    }

    @httpPut("/project")
    public async createProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("project", request);
        return data;
    }

    @httpPost("/:id/project")
    public async updateProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("project", request);
        return data;
    }

    @httpGet("/project/byid/:id")
    public async findProjectById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("project", request);
        return data;
    }

    @httpGet("/project/search")
    public async searchProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("project", request);
        return data;
    }

    @httpPut("/property")
    public async createProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("property", request);
        return data;
    }

    @httpPost("/:id/property")
    public async updateProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("property", request);
        return data;
    }

    @httpGet("/property/byid/:id")
    public async findPropertyById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("property", request);
        return data;
    }

    @httpGet("/property/search")
    public async searchProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("property", request);
        return data;
    }

    @httpPut("/interested")
    public async createInterested(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("interested", request);
        return data;
    }

    @httpPost("/:id/interested")
    public async updateInterested(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("interested", request);
        return data;
    }

    @httpGet("/interested/byid/:id")
    public async findInterestedById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("interested", request);
        return data;
    }

    @httpGet("/interested/search")
    public async searchInterested(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("interested", request);
        return data;
    }

    @httpPut("/propertytype")
    public async createPropertytype(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("propertytype", request);
        return data;
    }

    @httpPost("/:id/propertytype")
    public async updatePropertytype(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("propertytype", request);
        return data;
    }

    @httpGet("/propertytype/byid/:id")
    public async findPropertytypeById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("propertytype", request);
        return data;
    }

    @httpGet("/propertytype/search")
    public async searchPropertytype(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("propertytype", request);
        return data;
    }

    @httpPut("/relation")
    public async createRelation(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("relation", request);
        return data;
    }

    @httpPost("/:id/relation")
    public async updateRelation(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("relation", request);
        return data;
    }

    @httpGet("/relation/byid/:id")
    public async findRelationById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("relation", request);
        return data;
    }

    @httpGet("/relation/search")
    public async searchRelation(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("relation", request);
        return data;
    }

    @httpPut("/report")
    public async createReport(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("report", request);
        return data;
    }

    @httpPost("/:id/report")
    public async updateReport(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("report", request);
        return data;
    }

    @httpGet("/report/byid/:id")
    public async findReportById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("report", request);
        return data;
    }

    @httpGet("/report/search")
    public async searchReport(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("report", request);
        return data;
    }

    @httpPut("/transaction")
    public async createTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("transaction", request);
        return data;
    }

    @httpPost("/:id/transaction")
    public async updateTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("transaction", request);
        return data;
    }

    @httpGet("/transaction/byid/:id")
    public async findTransactionById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("transaction", request);
        return data;
    }

    @httpGet("/transaction/search")
    public async searchTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("transaction", request);
        return data;
    }
}
