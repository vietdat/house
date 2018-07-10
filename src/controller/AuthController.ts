import * as passport from "passport";
import { NextFunction, Request, Response } from "express";
import { controller, httpPost, httpGet } from "inversify-express-utils";
import { AuthService } from "../service/AuthService";
import { PassportConfig } from "../libs/passport";

@controller("/api/user/auth")
export class Auth {
    private authService = new AuthService();
    private passportConf = new PassportConfig();

    public initialize = () => {
        passport.use("jwt", this.authService.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    @httpPost("/login")
    public async login(request: Request, response: Response, next: NextFunction) {
        const token = await this.authService.login(request.body.phoneNumber, request.body.password);
        response.status(200).json(token);
    }

    @httpPost("/forgotpassword")
    public async forgotpassword(request: Request, response: Response, next: NextFunction) {
        const token = await this.authService.forgotpassword(request.body.phoneNumber);
        response.status(200).json(token);
    }

    @httpGet("/secret", passport.authenticate("jwt", { session: false }))
    public async testToken(request: Request, response: Response, next: NextFunction) {
        response.json({ message: "Success! You can not see this without a token" });
    }

    @httpGet("/facebook", passport.authenticate("facebook"))
    public async loginFacebook(request, response: Response, next: NextFunction) {
        response.status(200).json(this.authService.loginFacebook(request.user));
    }

    @httpGet("/google", passport.authenticate("google"))
    public async loginGoogle(request, response: Response, next: NextFunction) {
        response.status(200).json(this.authService.loginGoogle(request.user));
    }

    @httpGet("/twitter", passport.authenticate("twitter"))
    public async loginTwitter(request, response: Response, next: NextFunction) {
        response.status(200).json(this.authService.loginTwitter(request.user));
    }
}
