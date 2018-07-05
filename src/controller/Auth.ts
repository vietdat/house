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
import { passportConfig } from "../libs/passport";  

@controller("/auth")
export class Auth {
    private userService = new UserService();
    private passportConf = new passportConfig();

    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    private genToken = (user: User): Object => {
        let expires = moment().utc().add({ days: 7 }).unix();
        let token = jwt.encode({
            exp: expires,
            id: user.id
        }, "Fami@123");

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            user: user.id
        };
    }

    @httpPost("/login")
    async login(request: Request, response: Response, next: NextFunction) {
        try {
            let user = await this.userService.findOne({ email: request.body.email });

            if (user === null) throw "User not found";

            let success = await encryptionService.compare(request.body.password, user.password);
            console.log(success);
            if (success === false) throw Message.PASSWORD_INCORRECT;

            response.status(200).json(this.genToken(user));
        } catch (err) {
            return next({ statusCode: StatusCode.UNAUTHORIZED, message: Message.UNAUTHORIZED, err: err });
        }
    }

    @httpGet("/secret",  passport.authenticate('jwt', { session: false }))
    async testToken(request: Request, response: Response, next: NextFunction) {
        response.json({ message: "Success! You can not see this without a token" });
    }

    @httpGet("/facebook", passport.authenticate('facebook', { failureRedirect: "/login" }))
    async loginFacebook(request: Request, response: Response, next: NextFunction) {
        response.json({ message: "Success! Login facebook success" });
    }

    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: "Fami@123",
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, (req, payload: any, done) => {
            this.userService.findOne({ email: payload.email })
                .then(user => {
                    if (user === null) {
                        return done(null, false, { message: "The user in the token was not found" });
                    }

                    return done(null, { id: user.id, email: user.email });
                })
                .catch(err => {
                    return done(err);
                });
        });
    }

}