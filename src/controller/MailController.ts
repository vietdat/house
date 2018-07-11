import { NextFunction, Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { MailService } from "../service/MailService";
import { Authenticate } from "../libs/authenticate";

@controller("/api/mail")
export class MailController {
    public static TARGET_NAME: string = "MailController - 1";
    private mailService = new MailService();

    @httpPost("/", new Authenticate().authInternalToken)
    public async sendMail(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.mailService.sendMail(request.body.email, request.body.subject, request.body.content) });
    }

    @httpPost("/multi", new Authenticate().authInternalToken)
    public async sendMultiMail(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.mailService.sendMultiMail(request.body.emails, request.body.subject, request.body.content) });
    }
}
