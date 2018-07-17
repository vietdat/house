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
    @httpGet("/comment/byid/:id", passport.authenticate("jwt", { session: false }))
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
    @httpGet("/comment/search", passport.authenticate("jwt", { session: false }))
    public async searchComment(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("comment", request);
        return data;
    }

    /**
     * @api{put} /api/user/project Create project
     * @apiName CreateProject
     * @apiGroup User
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
    @httpPut("/project", passport.authenticate("jwt", { session: false }))
    public async createProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("project", request);
        return data;
    }

    /**
     * @api{post} /api/user/:id/project Update project
     * @apiName UpdateProject
     * @apiGroup User
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
    @httpPost("/:id/project", passport.authenticate("jwt", { session: false }))
    public async updateProject(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("project", request);
        return data;
    }

    /**
     * @api{get} /api/user/project/byid/:id Find project by id
     * @apiName FindProjectById
     * @apiGroup User
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
     * @api{get} /api/user/project/search Find project by id
     * @apiName FindProjectById
     * @apiGroup User
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
     * @api{put} /api/user/property Create property
     * @apiName Createproperty
     * @apiGroup User
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
    @httpPut("/property", passport.authenticate("jwt", { session: false }))
    public async createProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("property", request);
        return data;
    }

    /**
     * @api{post} /api/user/property Update property
     * @apiName UpdateProperty
     * @apiGroup User
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
    @httpPost("/:id/property", passport.authenticate("jwt", { session: false }))
    public async updateProperty(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("property", request);
        return data;
    }

    /**
     * @api{get} /api/user/property/byid/:id Find property by id
     * @apiName FindPropertyById
     * @apiGroup User
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
     * @api{get} /api/user/property/search Find property by id
     * @apiName FindPropertyById
     * @apiGroup User
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
     * @api{get} /api/user/agent/byid/:id Find agent by id
     * @apiName FindAgentById
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:Agent
     */
    @httpGet("/agent/byid/:id")
    public async findAgentById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("agent", request);
        return data;
    }

    /**
     * @api{get} /api/user/agent/search Find agent by id
     * @apiName FindAgentById
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:[Agent]
     */
    @httpGet("/agent/search")
    public async searchAgent(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("agent", request);
        return data;
    }

    /**
     * @api{put} /api/user/interested Interested project and peoperty
     * @apiName Interested
     * @apiGroup User
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} propId propId
     * @apiParam {String} propType propType
     * @apiParam {String} userId userId
     * @apiParam {String} userType userType
     *
     * @apiSuccess {Json} success:true
     */
    @httpPut("/interested", passport.authenticate("jwt", { session: false }))
    public async createInterested(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("interested", request);
        return data;
    }

    /**
     * @api{post} /api/user/project Update interested
     * @apiName UpdateInterested
     * @apiGroup User
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} propId propId
     * @apiParam {String} propType propType
     * @apiParam {String} userId userId
     * @apiParam {String} userType userType
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/:id/interested", passport.authenticate("jwt", { session: false }))
    public async updateInterested(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("interested", request);
        return data;
    }

    @httpGet("/interested/byid/:id")
    public async findInterestedById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("interested", request);
        return data;
    }

    /**
     * @api{get} /api/user/interested/search search interested of property and project
     * @apiName SearchInterested
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:[interested]
     */
    @httpGet("/interested/search")
    public async searchInterested(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("interested", request);
        return data;
    }

    /**
     * @api{put} /api/user/transaction Create transaction
     * @apiName transaction
     * @apiGroup User
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
    @httpPut("/transaction", passport.authenticate("jwt", { session: false }))
    public async createTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("transaction", request);
        return data;
    }

    /**
     * @api{post} /api/user/:id/transaction Update transaction
     * @apiName transaction
     * @apiGroup User
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
    @httpPost("/:id/transaction", passport.authenticate("jwt", { session: false }))
    public async updateTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("transaction", request);
        return data;
    }

    /**
     * @api{get} /api/user/transaction/byid/:id Find transaction by id
     * @apiName FindTransactionById
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:transaction
     */
    @httpGet("/transaction/byid/:id", passport.authenticate("jwt", { session: false }))
    public async findTransactionById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("transaction", request);
        return data;
    }

    /**
     * @api{get} /api/user/transaction/search  search transaction
     * @apiName SearchTransaction
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:[transaction]
     */
    @httpGet("/transaction/search", passport.authenticate("jwt", { session: false }))
    public async searchTransaction(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("transaction", request);
        return data;
    }

    /**
     * @api{get} /api/user/staff/search  search staff
     * @apiName Searchstaff
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:[staff]
     */
    @httpGet("/staff/search")
    public async searchStaff(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("staff", request);
        return data;
    }

    /**
     * @api{put} /api/user/report Create report
     * @apiName Createreport
     * @apiGroup User
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} propId propId
     * @apiParam {String} propType propType
     * @apiParam {String} userId userId
     * @apiParam {String} userType userType
     * @apiParam {String} message message
     *
     * @apiSuccess {Json} success:true
     */
    @httpPut("/report", passport.authenticate("jwt", { session: false }))
    public async createReport(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.create("report", request);
        return data;
    }

    /**
     * @api{post} /api/user/:id/report Update report
     * @apiName Updatereport
     * @apiGroup User
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {Json} propId propId
     * @apiParam {String} propType propType
     * @apiParam {String} userId userId
     * @apiParam {String} userType userType
     * @apiParam {String} message message
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/:id/report", passport.authenticate("jwt", { session: false }))
    public async updateReport(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.update("report", request);
        return data;
    }

    /**
     * @api{get} /api/user/report/byid/:id Get report by id
     * @apiName GetreportById
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:report
     */
    @httpGet("/report/byid/:id")
    public async findReportById(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.findById("report", request);
        return data;
    }

    /**
     * @api{get} /api/user/report/search Search report
     * @apiName Searchreport
     * @apiGroup User
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:[report]
     */
    @httpGet("/report/search")
    public async searchReport(request: Request, response: Response, next: NextFunction) {
        const data = await this.callService.search("report", request);
        return data;
    }
}
