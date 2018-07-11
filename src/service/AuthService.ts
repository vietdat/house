import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
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
    private userRepository: Repository<User> = getRepository(User);
    private user = new User();
    private _utils = new Utils();
    private _authenticate = new Authenticate();

    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    public async login(phoneNumber, password): Promise<object> {
        try {
            const user = await this.userRepository.findOne({ phoneNumber });

            if (user === null) {
                throw new Error("User not found");
            }

            const success = await encryptionService.compare(password, user.password);
            if (success === false) {
                throw new Error(Message.PASSWORD_INCORRECT);
            }

            if (!user.active) {
                throw new Error(sprintf(Message.NOT_ACTIVE, user));
            }
            return this.genToken(user);
        } catch (err) {
            throw err;
        }
    }

    public async forgotpassword(phoneNumber): Promise<boolean> {
        let user: User;

        const params = new ForgotPasswordModel(phoneNumber);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            user = await this.userRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "user"), err });
        }

        const internalToken: string = await this._authenticate.createInternalToken();

        if (!user) {
            throw new Error("User not found");
        }

        user.password = this._utils.generateOTPToken().toString();

        let updateData: User;
        updateData = await this.userRepository.create(user);
        // Update password
        try {
            await this.userRepository.save(updateData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "user"), err });
        }

        // Send new password to phone
        const content = "Password moi cua ban la: " + user.password;
        console.log(content);
        // this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: user.phoneNumber, content }, internalToken);

        return true;
    }

    public async updatepassword(phoneNumber, newPassword, oldPassword): Promise<boolean> {
        let user: User;

        const params = new UpdatePasswordModel(phoneNumber, newPassword, oldPassword);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            user = await this.userRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "user"), err });
        }

        const internalToken: string = await this._authenticate.createInternalToken();

        if (!user) {
            throw new Error("User not found");
        }

        const success = await encryptionService.compare(oldPassword, user.password);
        if (success === false) {
            throw new Error(Message.PASSWORD_INCORRECT);
        }

        let updateData: User;
        user.password = newPassword;
        updateData = await this.userRepository.create(user);

        // Update password
        try {
            await this.userRepository.save(updateData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "user"), err });
        }

        // Send new password to phone
        const content = "Password moi cua ban la: " + user.password;
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: user.phoneNumber, content }, internalToken);

        return true;
    }

    public async checkPhoneExist(phoneNumber): Promise<boolean> {
        let user: User;

        const params = new CheckPhoneExistModel(phoneNumber);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            user = await this.userRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "user"), err });
        }

        if (!user) {
            return false;
        }

        return true;
    }

    public async checkOtpToken(phoneNumber, otpToken): Promise<boolean> {
        let user: User;
        const data = new CheckToken(phoneNumber, otpToken);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            user = await this.userRepository.findOne({ phoneNumber, otpToken });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "user") });
        }

        user.active = true;
        if (user) {
            try {
                await this.userRepository.update(user.id, user);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "user") });
            }
        }

        return true;
    }

    public async resendOtp(phoneNumber): Promise<boolean> {
        let user: User;

        const data = new ResendToken(phoneNumber);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            user = await this.userRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "user") });
        }

        const content = "Opt token cua ban la: " + user.otpToken;
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: user.phoneNumber, content }, await this._authenticate.createInternalToken());

        return true;
    }

    public async loginFacebook(user): Promise<object> {
        try {
            return this.genToken(user);
        } catch (err) {
            throw err;
        }
    }

    public async loginGoogle(user): Promise<object> {
        try {
            return this.genToken(user);
        } catch (err) {
            throw err;
        }
    }

    public async loginTwitter(user): Promise<object> {
        try {
            return this.genToken(user);
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
            let user;
            try {
                user = await this.userRepository.findOne({ email: payload.email });
            } catch (err) {
                return next(err);
            }
            if (user === null) {
                return next(null, false, { message: "The user in the token was not found" });
            }

            return next(null, { id: user.id, email: user.email });
        });
    }

    private genToken = (user: User): object => {
        const expires = moment().utc().add({ days: 7 }).unix();
        const token = jwt.encode({
            exp: expires,
            id: user.id
        }, "Fami@123");

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            user: user.id
        };
    }
}
