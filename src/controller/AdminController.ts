import { NextFunction, Request, Response, json } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationPut } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { AdminService } from "../service/AdminService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import * as passport from "passport";
import { sprintf } from "sprintf-js";
import { CallService } from "../service/CallService";

@ApiPath({
    path: "/api/admin",
    name: "admin"
})
@controller("/api/admin")
export class AdminController {
    public static TARGET_NAME: string = "AdminController - 1";

    private adminService = new AdminService();
    private callService = new CallService();
    @ApiOperationPut({
        description: "Add new admin",
        summary: "Add new admin",
        path: "/",
        parameters: {
            body: { description: "New admin", required: true, model: "Admin" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Something fail" }
        }
    })
    @httpPut("/")
    public async create(request: Request, response: Response, next: NextFunction) {
        return this.adminService.create(request.body);
    }

    @ApiOperationGet({
        description: "Get admins objects list",
        summary: "Get admins list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Admin" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/search")
    public async all(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.adminService.search(request.query) });
    }

    @ApiOperationGet({
        description: "Get admin by id",
        summary: "Get admin by id",
        path: "/{id}",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Admin" }
        }
    })
    @httpGet("/", passport.authenticate("jwt", { session: false }))
    public async findById(request: Request, response: Response, next: NextFunction) {
        return this.adminService.findOne(request.user.id);
    }

    @ApiOperationPost({
        description: "Update admin",
        summary: "Update admin",
        path: "/{id}/update",
        parameters: {
            path: { id: { description: "Success" } }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "Admin" }
        }
    })
    @httpPost("/:adminId/update")
    public async update(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.adminService.update(request.params.adminId, request.body) });
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

    @httpPost("/transaction/:id/softdelete")
    public async softdeleteTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("transaction", request);
        return data;
    }

    @httpPost("/transaction/:id/active")
    public async activeTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("transaction", request);
        return data;
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

    @httpPost("/comment/:id/softdelete")
    public async softdeleteComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("comment", request);
        return data;
    }

    @httpPost("/comment/:id/active")
    public async activeComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("comment", request);
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

    @httpPost("/interested/:id/softdelete")
    public async softdeleteInterested(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("interested", request);
        return data;
    }

    @httpPost("/interested/:id/active")
    public async activeInterested(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("interested", request);
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

    @httpPost("/project/:id/softdelete")
    public async softdeleteProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("project", request);
        return data;
    }

    @httpPost("/project/:id/active")
    public async activeProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("project", request);
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

    @httpPost("/property/:id/softdelete")
    public async softdeleteProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("property", request);
        return data;
    }

    @httpPost("/property/:id/active")
    public async activeProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("property", request);
        return data;
    }

    @httpPut("/propertytype")
    public async createPropertyType(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("propertytype", request);
        return data;
    }

    @httpPost("/:id/propertytype")
    public async updatePropertyType(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("propertytype", request);
        return data;
    }

    @httpGet("/propertytype/byid/:id")
    public async findPropertyTypeById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("propertytype", request);
        return data;
    }

    @httpGet("/propertytype/search")
    public async searchPropertyType(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("propertytype", request);
        return data;
    }

    @httpPost("/propertytype/:id/softdelete")
    public async softdeletePropertyType(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("propertytype", request);
        return data;
    }

    @httpPost("/propertytype/:id/active")
    public async activePropertyType(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("propertytype", request);
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

    @httpPost("/relation/:id/softdelete")
    public async softdeleteRelation(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("relation", request);
        return data;
    }

    @httpPost("/relation/:id/active")
    public async activeRelation(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("relation", request);
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

    @httpPost("/report/:id/softdelete")
    public async softdeleteReport(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("report", request);
        return data;
    }

    @httpPost("/report/:id/active")
    public async activeReport(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("report", request);
        return data;
    }

    @httpPut("/wallet")
    public async createWallet(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("wallet", request);
        return data;
    }

    @httpPost("/:id/wallet")
    public async updateWallet(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("wallet", request);
        return data;
    }

    @httpGet("/wallet/byid/:id")
    public async findWalletById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("wallet", request);
        return data;
    }

    @httpGet("/wallet/search")
    public async searchWallet(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("wallet", request);
        return data;
    }

    @httpPost("/wallet/:id/softdelete")
    public async softdeleteWallet(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("wallet", request);
        return data;
    }

    @httpPost("/wallet/:id/active")
    public async activeWallet(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("wallet", request);
        return data;
    }
}
