import { NextFunction, Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { SmsService } from "../service/SmsService";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Authenticate } from "../libs/authenticate";
import { sprintf } from "sprintf-js";
import { inject } from "inversify";

@controller("/api/sms")
export class SmsController {
    public static TARGET_NAME: string = "SmsController1";
    private smsService = new SmsService();

    @httpPost("/", new Authenticate().authInternalToken)
    public async all(request: Request, response: Response, next: NextFunction) {
        return response.json({success: true, data: await this.smsService.sendSms(request.body)});
    }
}
