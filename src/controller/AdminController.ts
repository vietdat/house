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

    /**
     * @api{put} /api/admin Create new admin
     * @apiName CreateAdmin
     * @apiGroup Admin
     *
     * @apiParam {String} familyName family name
     * @apiParam {String} givenName given name
     * @apiParam {String} phoneNumber Phone number
     *
     * @apiSuccess {Json} success:true
     */
    @httpPut("/")
    public async create(request: Request, response: Response, next: NextFunction) {
        return this.adminService.create(request.body);
    }

    @httpGet("/search")
    public async all(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.adminService.search(request.query) });
    }

    /**
     * @api{get} /api/admin Get info admin
     * @apiName GetAdmin
     * @apiGroup Admin
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:admin
     */
    @httpGet("/", passport.authenticate("jwt", { session: false }))
    public async findById(request: Request, response: Response, next: NextFunction) {
        return this.adminService.findOne(request.user.id);
    }

    /**
     * @api{post} /api/admin/:id/update Update user
     * @apiName UpdateUser
     * @apiGroup Admin
     *
     * @apiParam {String} email email
     * @apiParam {String} birthDate birthDate
     * @apiParam {String} gender gender
     * @apiParam {String} language language
     * @apiParam {String} avatar avatar
     * @apiParam {Json} address address
     * @apiParam {String} postCode postCode
     * @apiParam {String} introduce introduce
     * @apiParam {[String]} identifies identifies
     * @apiParam {String} company company
     * @apiParam {Json} identifies bank
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/:adminId/update")
    public async update(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.adminService.update(request.params.adminId, request.body) });
    }

    /**
     * @api{put} /api/admin/project Create project
     * @apiName CreateProject
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} address address
     * @apiParam {Json} properties properties
     * @apiParam {String} postCode postCode
     * @apiParam {String} price price
     * @apiParam {Number} commission commission
     * @apiParam {String} promotion promotion
     * @apiParam {Number} bedroom bedroom
     * @apiParam {Number} bathroom bathroom
     * @apiParam {String} direction direction
     * @apiParam {Boolean} isOwner isOwner
     * @apiParam {String} ownerId ownerId
     * @apiParam {String} place place
     * @apiParam {Date} from from
     * @apiParam {Date} to to
     * @apiParam {String} status status
     * @apiParam {Number} totalProperty totalProperty
     * @apiParam {[Json]} videos videos
     * @apiParam {[Json]} utilityImages utilityImages
     * @apiParam {[Json]} utilityNames utilityNames
     * @apiParam {[JSON]} documents documents
     * @apiParam {[JSON]} designImages designImages
     *
     * @apiSuccess {Json} success:true
     */
    @httpPut("/project")
    public async createProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("project", request);
        return data;
    }

    /**
     * @api{post} /api/admin/:id/project Update project
     * @apiName UpdateProject
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} address address
     * @apiParam {Json} properties properties
     * @apiParam {String} postCode postCode
     * @apiParam {String} price price
     * @apiParam {Number} commission commission
     * @apiParam {String} promotion promotion
     * @apiParam {Number} bedroom bedroom
     * @apiParam {Number} bathroom bathroom
     * @apiParam {String} direction direction
     * @apiParam {Boolean} isOwner isOwner
     * @apiParam {String} ownerId ownerId
     * @apiParam {String} place place
     * @apiParam {Date} from from
     * @apiParam {Date} to to
     * @apiParam {String} status status
     * @apiParam {Number} totalProperty totalProperty
     * @apiParam {[Json]} videos videos
     * @apiParam {[Json]} utilityImages utilityImages
     * @apiParam {[Json]} utilityNames utilityNames
     * @apiParam {[JSON]} documents documents
     * @apiParam {[JSON]} designImages designImages
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/:id/project")
    public async updateProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("project", request);
        return data;
    }

    /**
     * @api{get} /api/admin/project/byid/:id Find project by id
     * @apiName FindProjectById
     * @apiGroup Admin
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:Project
     */
    @httpGet("/project/byid/:id")
    public async findProjectById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("project", request);
        return data;
    }

    /**
     * @api{get} /api/admin/project/search Find project by id
     * @apiName FindProjectById
     * @apiGroup Admin
     *
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:[Project]
     */
    @httpGet("/project/search")
    public async searchProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("project", request);
        return data;
    }

    /**
     * @api{post} /api/admin/project/:id/softdelete Soft delete project
     * @apiName Softdeleteproject
     * @apiGroup Admin
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/project/:id/softdelete")
    public async softdeleteProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("project", request);
        return data;
    }

    /**
     * @api{post} /api/admin/project/:id/active active project
     * @apiName activeproject
     * @apiGroup Admin
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/project/:id/active")
    public async activeProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("project", request);
        return data;
    }

    /**
     * @api{put} /api/admin/property Create property
     * @apiName Createproperty
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} address address
     * @apiParam {Json} properties properties
     * @apiParam {String} postCode postCode
     * @apiParam {String} price price
     * @apiParam {Number} commission commission
     * @apiParam {String} promotion promotion
     * @apiParam {String} introduce introduce
     * @apiParam {Number} bedroom bedroom
     * @apiParam {Number} bathroom bathroom
     *  @apiParam {Number} direction direction
     * @apiParam {String} direction direction
     * @apiParam {Boolean} isOwner isOwner
     * @apiParam {String} ownerId ownerId
     * @apiParam {String} place place
     * @apiParam {Date} from from
     * @apiParam {Date} to to
     * @apiParam {String} status status
     * @apiParam {Number} totalProperty totalProperty
     * @apiParam {[Json]} videos videos
     * @apiParam {[Json]} utilityImages utilityImages
     * @apiParam {[Json]} utilityNames utilityNames
     * @apiParam {[JSON]} documents documents
     * @apiParam {[JSON]} designImages designImages
     * @apiParam {String} designImages projectId
     *
     * @apiSuccess {Json} success:true
     */
    @httpPut("/property")
    public async createProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("property", request);
        return data;
    }

    /**
     * @api{post} /api/admin/property Update property
     * @apiName UpdateProperty
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} address address
     * @apiParam {Json} properties properties
     * @apiParam {String} postCode postCode
     * @apiParam {String} price price
     * @apiParam {Number} commission commission
     * @apiParam {String} promotion promotion
     * @apiParam {String} introduce introduce
     * @apiParam {Number} bedroom bedroom
     * @apiParam {Number} bathroom bathroom
     *  @apiParam {Number} direction direction
     * @apiParam {String} direction direction
     * @apiParam {Boolean} isOwner isOwner
     * @apiParam {String} ownerId ownerId
     * @apiParam {String} place place
     * @apiParam {Date} from from
     * @apiParam {Date} to to
     * @apiParam {String} status status
     * @apiParam {Number} totalProperty totalProperty
     * @apiParam {[Json]} videos videos
     * @apiParam {[Json]} utilityImages utilityImages
     * @apiParam {[Json]} utilityNames utilityNames
     * @apiParam {[JSON]} documents documents
     * @apiParam {[JSON]} designImages designImages
     * @apiParam {String} designImages projectId
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/:id/property")
    public async updateProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("property", request);
        return data;
    }

    /**
     * @api{get} /api/admin/property/byid/:id Find property by id
     * @apiName FindPropertyById
     * @apiGroup Admin
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:property
     */
    @httpGet("/property/byid/:id")
    public async findPropertyById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("property", request);
        return data;
    }

    /**
     * @api{get} /api/admin/property/search Find property by id
     * @apiName FindPropertyById
     * @apiGroup Admin
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:[property]
     */
    @httpGet("/property/search")
    public async searchProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("property", request);
        return data;
    }

    /**
     * @api{post} /api/admin/property/:id/active active property
     * @apiName activeproperty
     * @apiGroup Admin
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/property/:id/softdelete")
    public async softdeleteProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("property", request);
        return data;
    }

    /**
     * @api{post} /api/admin/property/:id/active active property
     * @apiName activeproperty
     * @apiGroup Admin
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/property/:id/active")
    public async activeProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("property", request);
        return data;
    }

    /**
     * @api{put} /api/admin/project Create project
     * @apiName CreateProject
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {[String]} saleAreas saleAreas
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/:id/sale")
    public async updateSale(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("sale", request);
        return data;
    }

    /**
     * @api{get} /api/admin/sale/byid/:id Find sale by id
     * @apiName FindSaleById
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpGet("/sale/byid/:id")
    public async findSaleById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("sale", request);
        return data;
    }

    /**
     * @api{get} /api/admin/sale/search Search sale
     * @apiName SearchSale
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpGet("/sale/search")
    public async searchSale(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("sale", request);
        return data;
    }

    /**
     * @api{post} /api/admin/sale/:id/softdelete Soft delete sale
     * @apiName SoftDeleteSale
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/sale/:id/softdelete")
    public async softdeleteSale(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("sale", request);
        return data;
    }

    /**
     * @api{post} /api/admin/sale/:id/active Active sale
     * @apiName ActiveSale
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/sale/:id/active")
    public async activeSale(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("sale", request);
        return data;
    }

    /**
     * @api{put} /api/admin/transaction Create transaction
     * @apiName transaction
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} salerId salerId
     * @apiParam {String} salerType salerType
     * @apiParam {String} buyerId buyerId
     * @apiParam {String} buyerType buyerType
     * @apiParam {String} propertyId propertyId
     * @apiParam {String} status status
     *
     * @apiSuccess {Json} success:true
     */
    @httpPut("/transaction")
    public async createTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("transaction", request);
        return data;
    }

    /**
     * @api{post} /api/admin/:id/transaction Update transaction
     * @apiName Updatetransaction
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} salerId salerId
     * @apiParam {String} salerType salerType
     * @apiParam {String} buyerId buyerId
     * @apiParam {String} buyerType buyerType
     * @apiParam {String} propertyId propertyId
     * @apiParam {String} status status
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/:id/transaction")
    public async updateTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("transaction", request);
        return data;
    }

    /**
     * @api{get} /api/admin/transaction/byid/:id Find transaction by id
     * @apiName Updatetransaction
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:transaction
     */
    @httpGet("/transaction/byid/:id")
    public async findTransactionById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("transaction", request);
        return data;
    }

    /**
     * @api{get} /api/admin/transaction/search Search transaction
     * @apiName SearchTransaction
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:transaction
     */
    @httpGet("/transaction/search")
    public async searchTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("transaction", request);
        return data;
    }

    /**
     * @api{post} /api/admin/transaction/:id/softdelete Soft delete transaction
     * @apiName SoftDeleteTransaction
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/transaction/:id/softdelete")
    public async softdeleteTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("transaction", request);
        return data;
    }

    /**
     * @api{post} /api/admin/transaction/:id/active Soft delete transaction
     * @apiName SoftDeleteTransaction
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/transaction/:id/active")
    public async activeTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("transaction", request);
        return data;
    }

    /**
     * @api{put} /api/admin/comment Create comment
     * @apiName CreateComment
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {String} propId propId
     * @apiParam {String} propType propType
     * @apiParam {String} userId userId
     * @apiParam {String} userType userType
     * @apiParam {String} comment comment
     * @apiParam {number} rating rating
     *
     * @apiSuccess {Json} success:true
     */
    @httpPut("/comment")
    public async createComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("comment", request);
        return data;
    }

    /**
     * @api{post} /api/admin/:id/comment Update comment
     * @apiName UpdateComment
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {String} propId propId
     * @apiParam {String} propType propType
     * @apiParam {String} userId userId
     * @apiParam {String} userType userType
     * @apiParam {String} comment comment
     * @apiParam {number} rating rating
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/:id/comment")
    public async updateComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("comment", request);
        return data;
    }

    /**
     * @api{post} /api/admin/comment/byid/:id Get comment by id
     * @apiName FindCommnetById
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpGet("/comment/byid/:id")
    public async findCommentById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("comment", request);
        return data;
    }

    /**
     * @api{get} /api/admin/comment/search Search comment
     * @apiName SearchComment
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpGet("/comment/search")
    public async searchComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("comment", request);
        return data;
    }

    /**
     * @api{post} /api/admin/comment/:id/softdelete Soft delete comment
     * @apiName SoftDeleteComment
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/comment/:id/softdelete")
    public async softdeleteComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.softDeleteById("comment", request);
        return data;
    }

    /**
     * @api{post} /api/admin/comment/:id/active Active comment
     * @apiName ActiveComment
     * @apiGroup Admin
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/comment/:id/active")
    public async activeComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.activeById("comment", request);
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
