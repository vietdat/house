import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Constant } from "../all/constant";
import { Sms } from "../model/SmsModel";
import * as request from "request-promise";
import { Utils } from "../libs/Utils";
import { validate } from "class-validator";

export class SmsService {
    private utils = new Utils();

    public async sendSms(data) {
        const sms = new Sms(data.phoneNumber, data.content);
        const errors = await validate(sms);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        const json = { to: [sms.phoneNumber], content: sms.content, sms_type: 2, brandname: "" };
        request({
            headers: {
                Authorization: Constant.SMS_TOKEN
            },
            uri: Constant.SMS_URL + "/sms/send",
            method: "POST",
            body: json,
            json: true
        }, (err, doc, body) => {
            if (err) {
                throw this.utils.createError({statusCode: StatusCode.NOT_ACCEPTABLE, message: sprintf(Message.NOT_ACCEPTED, "sms"), err});
            }

            if (body.error) {
                throw this.utils.createError({statusCode: StatusCode.NOT_ACCEPTABLE, message: sprintf(Message.NOT_ACCEPTED, "sms"), err});
            } else {
                return;
            }
        });
    }
}