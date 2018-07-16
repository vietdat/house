import { NextFunction, Request, Response, json } from "express";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationPut } from "swagger-express-ts";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { UserService } from "../service/UserService";
import * as passport from "passport";
import { CallService } from "../service/CallService";

@ApiPath({
    path: "/api/user",
    name: "user"
})
@controller("/api/user")
export class UserController {
    public static TARGET_NAME: string = "UserController - 1";
    private userService = new UserService();
    private callService = new CallService();

    /**
     * @api{put} /api/user Create new user
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiParam {String} familyName family name
     * @apiParam {String} givenName given name
     * @apiParam {String} phoneNumber Phone number
     *
     * @apiSuccess {Json} success:true
     */
    @httpPut("/")
    public async create(request: Request, response: Response, next: NextFunction) {
        return this.userService.create(request.body);
    }

    /**
     * @api{get} /api/user/search Search user
     * @apiName SearchUser
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     */
    @httpGet("/search")
    public async all(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.userService.search(request.query) });
    }

    /**
     * @api{get} /api/user/byId/:id Get user by Id
     * @apiName FindUserById
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     */
    @httpGet("/byId/:userId")
    public async findById(request: Request, response: Response, next: NextFunction) {
        return this.userService.findOne(request.params.id);
    }

    @httpPost("/:userId/active")
    public async active(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.userService.active(request.params.userId) });
    }

    @httpPost("/:userId/softdelete")
    public async softdelete(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.userService.softdelete(request.params.userId) });
    }

    /**
     * @api{post} /api/user/:id/update Update user
     * @apiName UpdateUser
     * @apiGroup User
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
    @httpPost("/:userId/update")
    public async update(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.userService.update(request.params.userId, request.body) });
    }

    /**
     * @api{get} /api/user/wallet Get wallet of user
     * @apiName WalletOfUser
     * @apiGroup User
     *
     *  @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpGet("/wallet", passport.authenticate("jwt", { session: false }))
    public async getWallet(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.userService.getWallet(request.user.walletId) });
    }

    /**
     * @api{put} /api/user/comment Create comment
     * @apiName CreateComment
     * @apiGroup User
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
    @httpPut("/comment", passport.authenticate("jwt", { session: false }))
    public async createComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("comment", request);
        return data;
    }

    /**
     * @api{post} /api/user/:id/comment Update comment
     * @apiName UpdateComment
     * @apiGroup User
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
    @httpPost("/:id/comment", passport.authenticate("jwt", { session: false }))
    public async updateComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("comment", request);
        return data;
    }

    /**
     * @api{post} /api/user/comment/byid/:id Get comment by id
     * @apiName FindCommnetById
     * @apiGroup User
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
     * @api{get} /api/user/comment/search Search comment
     * @apiName SearchComment
     * @apiGroup User
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
