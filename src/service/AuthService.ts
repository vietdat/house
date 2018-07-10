import { getRepository, Repository, InsertResult, TreeChildren } from "typeorm";
import { User } from "../entity/User";
import { sprintf } from "sprintf-js";
import * as typeData from "../libs/typeData";
import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { Strategy, ExtractJwt } from "passport-jwt";
import { NextFunction, Request, Response } from "express";
import { UserService } from "./UserService";
import { controller, httpPost, httpGet } from "inversify-express-utils";
import { StatusCode } from "../all/status-code";
import { encryptionService } from "../libs/encryption";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";
import { Constant } from "../all/constant";
import { Authenticate } from "../libs/authenticate";

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

            return this.genToken(user);
        } catch (err) {
            throw err;
        }
    }

    public async forgotpassword(phoneNumber): Promise<boolean> {
        let user: User;

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
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: user.phoneNumber, content }, internalToken);

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
