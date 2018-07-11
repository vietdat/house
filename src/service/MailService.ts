import { Mail, MultiMail } from "../model/MailModel";
import * as nodemailer from "nodemailer";
import { Utils } from "../libs/Utils";
import { validate } from "class-validator";

export class MailService {
    private utils = new Utils();

    public async sendMail(email, subject, content) {
        let transporter;

        const mail = new Mail(email, subject, content);
        const errors = await validate(mail);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        const body = {
            to: email,
            subject,
            text: content
        };

        const mailOptions = {
            from: "support@famicare.vn",
            to: body.to,
            subject: body.subject,
            text: body.text
        };

        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "support@famicare.vn",
                pass: "FamiCare@123"
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                throw error;
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        return true;
    }

    public async sendMultiMail(emails, subject, content) {
        const mail = new MultiMail(emails, subject, content);
        const errors = await validate(mail);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        let transporter;
        const body = {
            to: emails,
            subject,
            text: content
        };

        const mailOptions = {
            from: "support@famicare.vn",
            to: body.to,
            subject: body.subject,
            text: body.text
        };

        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "support@famicare.vn",
                pass: "FamiCare@123"
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                throw error;
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
}