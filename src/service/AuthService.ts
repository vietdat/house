import { getRepository, Repository } from "typeorm";
import { Admin } from "../entity/Admin";
import { sprintf } from "sprintf-js";
import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { Strategy, ExtractJwt } from "passport-jwt";
import { StatusCode } from "../all/status-code";
import { encryptionService } from "../libs/encryption";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";
import { Constant } from "../all/constant";
import { Authenticate } from "../libs/authenticate";
import { CheckToken, ResendToken, CheckPhoneExistModel, ForgotPasswordModel, UpdatePasswordModel } from "../model/AuthModel";
import { validate } from "class-validator";

export class AuthService {
    private adminRepository: Repository<Admin> = getRepository(Admin);
    private admin = new Admin();
    private _utils = new Utils();
    private _authenticate = new Authenticate();

    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    public async login(phoneNumber, password): Promise<object> {
        try {
            const admin = await this.adminRepository.findOne({ phoneNumber });

            if (admin === null) {
                throw new Error("Admin not found");
            }

            const success = await encryptionService.compare(password, admin.password);
            if (success === false) {
                throw new Error(Message.PASSWORD_INCORRECT);
            }

            return this.genToken(admin);
        } catch (err) {
            throw err;
        }
    }

    public async forgotpassword(phoneNumber): Promise<boolean> {
        let admin: Admin;

        const params = new ForgotPasswordModel(phoneNumber);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            admin = await this.adminRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "admin"), err });
        }

        const internalToken: string = await this._authenticate.createInternalToken();

        if (!admin) {
            throw new Error("Admin not found");
        }

        admin.password = this._utils.generateOTPToken().toString();

        let updateData: Admin;
        updateData = await this.adminRepository.create(admin);
        // Update password
        try {
            await this.adminRepository.save(updateData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "admin"), err });
        }

        // Send new password to phone
        const content = "Password moi cua ban la: " + admin.password;
        console.log(content);
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: admin.phoneNumber, content }, internalToken);

        return true;
    }

    public async updatepassword(phoneNumber, newPassword, oldPassword): Promise<boolean> {
        let admin: Admin;

        const params = new UpdatePasswordModel(phoneNumber, newPassword, oldPassword);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            admin = await this.adminRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "admin"), err });
        }

        const internalToken: string = await this._authenticate.createInternalToken();

        if (!admin) {
            throw new Error("Admin not found");
        }

        const success = await encryptionService.compare(oldPassword, admin.password);
        if (success === false) {
            throw new Error(Message.PASSWORD_INCORRECT);
        }

        let updateData: Admin;
        admin.password = newPassword;
        updateData = await this.adminRepository.create(admin);

        // Update password
        try {
            await this.adminRepository.save(updateData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "admin"), err });
        }

        // Send new password to phone
        const content = "Password moi cua ban la: " + admin.password;
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: admin.phoneNumber, content }, internalToken);

        return true;
    }

    public async checkPhoneExist(phoneNumber): Promise<boolean> {
        let admin: Admin;

        const params = new CheckPhoneExistModel(phoneNumber);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            admin = await this.adminRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "admin"), err });
        }

        if (!admin) {
            return false;
        }

        return true;
    }

    public async checkOtpToken(phoneNumber, otpToken): Promise<boolean> {
        let admin: Admin;
        const data = new CheckToken(phoneNumber, otpToken);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            admin = await this.adminRepository.findOne({ phoneNumber, otpToken });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "admin") });
        }

        if (admin) {
            try {
                await this.adminRepository.update(admin.id, admin);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "admin") });
            }
        }

        return true;
    }

    public async resendOtp(phoneNumber): Promise<boolean> {
        let admin: Admin;

        const data = new ResendToken(phoneNumber);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            admin = await this.adminRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "admin") });
        }

        const content = "Opt token cua ban la: " + admin.otpToken;
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: admin.phoneNumber, content }, await this._authenticate.createInternalToken());

        return true;
    }

    public getStrategy = (): Strategy => {
        const params = {
            secretOrKey: "Fami@123",
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, async (req, payload: any, next) => {
            let admin;
            try {
                admin = await this.adminRepository.findOne({ email: payload.email });
            } catch (err) {
                return next(err);
            }
            if (admin === null) {
                return next(null, false, { message: "The admin in the token was not found" });
            }

            return next(null, { id: admin.id, email: admin.email });
        });
    }

    private genToken = (admin: Admin): object => {
        const expires = moment().utc().add({ days: 7 }).unix();
        const token = jwt.encode({
            exp: expires,
            id: admin.id
        }, "Fami@123");

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            admin: admin.id
        };
    }
}
