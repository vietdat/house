import { NextFunction, Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { SmsService } from "../service/SmsService";
import { Authenticate } from "../libs/authenticate";

@controller("/api/sms")
export class SmsController {
    public static TARGET_NAME: string = "SmsController - 1";
    private smsService = new SmsService();

    /**
     * @api{post} /api/sms Send sms
     * @apiName sendSms
     * @apiGroup Sms
     *
     * @apiParam {string} phoneNumber phoneNumber
     * @apiParam {string} content content
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/", new Authenticate().authInternalToken)
    public async sendSms(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.smsService.sendSms(request.body) });
    }

    /**
     * @api{post} /api/sms/multi Send multi sms
     * @apiName sendMultiSms
     * @apiGroup Sms
     *
     * @apiParam {[string]} phoneNumbers phoneNumbers
     * @apiParam {string} content content
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/multi", new Authenticate().authInternalToken)
    public async sendMultiSms(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.smsService.sendMultiSms(request.body) });
    }
}
