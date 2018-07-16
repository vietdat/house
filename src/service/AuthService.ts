import { getRepository, Repository } from "typeorm";
import { Staff } from "../entity/Staff";
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
    private staffRepository: Repository<Staff> = getRepository(Staff);
    private staff = new Staff();
    private _utils = new Utils();
    private _authenticate = new Authenticate();

    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    public async login(phoneNumber, password): Promise<object> {
        try {
            const staff = await this.staffRepository.findOne({ phoneNumber });

            if (staff === null) {
                throw new Error("Staff not found");
            }

            const success = await encryptionService.compare(password, staff.password);
            if (success === false) {
                throw new Error(Message.PASSWORD_INCORRECT);
            }

            if (!staff.active) {
                throw new Error(sprintf(Message.NOT_ACTIVE, staff));
            }
            return this.genToken(staff);
        } catch (err) {
            throw err;
        }
    }

    public async forgotpassword(phoneNumber): Promise<boolean> {
        let staff: Staff;

        const params = new ForgotPasswordModel(phoneNumber);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            staff = await this.staffRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "staff"), err });
        }

        const internalToken: string = await this._authenticate.createInternalToken();

        if (!staff) {
            throw new Error("Staff not found");
        }

        staff.password = this._utils.generateOTPToken().toString();

        let updateData: Staff;
        updateData = await this.staffRepository.create(staff);
        // Update password
        try {
            await this.staffRepository.save(updateData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "staff"), err });
        }

        // Send new password to phone
        const content = "Password moi cua ban la: " + staff.password;
        console.log(content);
        // this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: staff.phoneNumber, content }, internalToken);

        return true;
    }

    public async updatepassword(phoneNumber, newPassword, oldPassword): Promise<boolean> {
        let staff: Staff;

        const params = new UpdatePasswordModel(phoneNumber, newPassword, oldPassword);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            staff = await this.staffRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "staff"), err });
        }

        const internalToken: string = await this._authenticate.createInternalToken();

        if (!staff) {
            throw new Error("Staff not found");
        }

        const success = await encryptionService.compare(oldPassword, staff.password);
        if (success === false) {
            throw new Error(Message.PASSWORD_INCORRECT);
        }

        let updateData: Staff;
        staff.password = newPassword;
        updateData = await this.staffRepository.create(staff);

        // Update password
        try {
            await this.staffRepository.save(updateData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "staff"), err });
        }

        // Send new password to phone
        const content = "Password moi cua ban la: " + staff.password;
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: staff.phoneNumber, content }, internalToken);

        return true;
    }

    public async checkPhoneExist(phoneNumber): Promise<boolean> {
        let staff: Staff;

        const params = new CheckPhoneExistModel(phoneNumber);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            staff = await this.staffRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "staff"), err });
        }

        if (!staff) {
            return false;
        }

        return true;
    }

    public async checkOtpToken(phoneNumber, otpToken): Promise<boolean> {
        let staff: Staff;
        const data = new CheckToken(phoneNumber, otpToken);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            staff = await this.staffRepository.findOne({ phoneNumber, otpToken });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "staff") });
        }

        staff.active = true;
        if (staff) {
            try {
                await this.staffRepository.update(staff.id, staff);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "staff") });
            }
        }

        return true;
    }

    public async resendOtp(phoneNumber): Promise<boolean> {
        let staff: Staff;

        const data = new ResendToken(phoneNumber);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            staff = await this.staffRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "staff") });
        }

        const content = "Opt token cua ban la: " + staff.otpToken;
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: staff.phoneNumber, content }, await this._authenticate.createInternalToken());

        return true;
    }

    public async loginFacebook(staff): Promise<object> {
        try {
            return this.genToken(staff);
        } catch (err) {
            throw err;
        }
    }

    public async loginGoogle(staff): Promise<object> {
        try {
            return this.genToken(staff);
        } catch (err) {
            throw err;
        }
    }

    public async loginTwitter(staff): Promise<object> {
        try {
            return this.genToken(staff);
        } catch (err) {
            throw err;
        }
    }

    public getStrategy = (): Strategy => {
        const params = {
            secretOrKey: "Fami@123",
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, async (req, payload: any, next) => {
            let staff;
            try {
                staff = await this.staffRepository.findOne({ email: payload.email });
            } catch (err) {
                return next(err);
            }
            if (staff === null) {
                return next(null, false, { message: "The staff in the token was not found" });
            }

            return next(null, { id: staff.id, email: staff.email });
        });
    }

    private genToken = (staff: Staff): object => {
        const expires = moment().utc().add({ days: 7 }).unix();
        const token = jwt.encode({
            exp: expires,
            id: staff.id
        }, "Fami@123");

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            staff: staff.id
        };
    }
}
