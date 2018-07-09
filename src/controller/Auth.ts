import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../entity/user";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/UserService";
import { controller, httpPost, httpGet } from "inversify-express-utils";
import { StatusCode } from "../all/status-code";
import { encryptionService } from "../libs/encryption";
import { Message } from "../all/message";
import { PassportConfig } from "../libs/passport";

@controller("/auth")
export class Auth {
    private userService = new UserService();
    private passportConf = new PassportConfig();

    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    @httpPost("/login")
    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userService.findOne({ email: request.body.email });

            if (user === null) {
                throw new Error("User not found");
            }

            const success = await encryptionService.compare(request.body.password, user.password);
            if (success === false) {
                throw new Error(Message.PASSWORD_INCORRECT);
            }

            response.status(200).json(this.genToken(user));
        } catch (err) {
            return next({ statusCode: StatusCode.UNAUTHORIZED, message: Message.UNAUTHORIZED, err });
        }
    }

    @httpGet("/secret", passport.authenticate("jwt", { session: false }))
    public async testToken(request: Request, response: Response, next: NextFunction) {
        response.json({ message: "Success! You can not see this without a token" });
    }

    @httpGet("/facebook", passport.authenticate("facebook"))
    public async loginFacebook(request, response: Response, next: NextFunction) {
        try {
            response.status(200).json(this.genToken(request.user));
        } catch (err) {
            return next({ statusCode: StatusCode.UNAUTHORIZED, message: Message.UNAUTHORIZED, err });
        }
    }

    @httpGet("/google", passport.authenticate("google"))
    public async loginGoogle(request, response: Response, next: NextFunction) {
        try {
            response.status(200).json(this.genToken(request.user));
        } catch (err) {
            return next({ statusCode: StatusCode.UNAUTHORIZED, message: Message.UNAUTHORIZED, err });
        }
    }

    @httpGet("/twitter", passport.authenticate("twitter"))
    public async loginTwitter(request, response: Response, next: NextFunction) {
        try {
            response.status(200).json(this.genToken(request.user));
        } catch (err) {
            return next({ statusCode: StatusCode.UNAUTHORIZED, message: Message.UNAUTHORIZED, err });
        }
    }

    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: "Fami@123",
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, async (req, payload: any, next) => {
            let user;
            try {
                user = await this.userService.findOne({ email: payload.email });
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
