import * as passport from "passport";
import { NextFunction, Request, Response } from "express";
import { controller, httpPost, httpGet } from "inversify-express-utils";
import { AuthService } from "../service/AuthService";
import { PassportConfig } from "../libs/passport";

@controller("/api/admin/auth")
export class Auth {
    private authService = new AuthService();
    private passportConf = new PassportConfig();

    public initialize = () => {
        passport.use("jwt", this.authService.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    /**
     * @api{post} /api/user/auth/login Login
     * @apiName Login
     * @apiGroup Auth
     *
     * @apiParam {String} phoneNumber phone number
     * @apiParam {String} password password
     *
     * @apiSuccess {Json} success:true
     * @apiSuccess {Json} data:token
     */
    @httpPost("/login")
    public async login(request: Request, response: Response, next: NextFunction) {
        const token = await this.authService.login(request.body.phoneNumber, request.body.password);
        response.status(200).json({ success: true, data: token });
    }

    /**
     * @api{post} /api/user/auth/forgotpassword Forgotpassword
     * @apiName Forgotpassword
     * @apiGroup Auth
     *
     *  @apiParam {String} phoneNumber phoneNumber
     * @apiSuccess {Json} success:true
     */
    @httpPost("/forgotpassword")
    public async forgotpassword(request: Request, response: Response, next: NextFunction) {
        const token = await this.authService.forgotpassword(request.body.phoneNumber);
        response.status(200).json({ success: true });
    }

    /**
     * @api{post} /api/user/auth/updatepassword Update password
     * @apiName updatepassword
     * @apiGroup Auth
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiParam {String} phoneNumber phoneNumber
     * @apiParam {String} newPassword newPassword
     * @apiParam {String} oldPassword oldPassword
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/updatepassword", passport.authenticate("jwt", { session: false }))
    public async updatepassword(request: Request, response: Response, next: NextFunction) {
        const token = await this.authService.updatepassword(request.body.phoneNumber, request.body.newPassword, request.body.oldPassword);
        response.status(200).json({ success: true });
    }

    /**
     * @api{post} /api/user/auth/:phoneNumber/exist Check phone exist
     * @apiName CheckPhoneExist
     * @apiGroup Auth
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/:phoneNumber/exist")
    public async checkPhoneExist(request: Request, response: Response, next: NextFunction) {
        const result = await this.authService.checkPhoneExist(request.params.phoneNumber);
        response.status(200).json({ success: true, data: result });
    }

    /**
     * @api{post} /api/user/auth/otpToken/:otpToken checkOtpToken
     * @apiName CheckPhoneExist
     * @apiGroup Auth
     *
     * @apiParam {String} phoneNumber phoneNumber
     * @apiParam {String} otpToken otpToken
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/otpToken/:otpToken")
    public async checkOtpToken(request: Request, response: Response, next: NextFunction) {
        await this.authService.checkOtpToken(request.body.phoneNumber, request.params.otpToken);
        return response.json({ success: true });
    }

    /**
     * @api{post} /api/user/auth/resend/token Resend otp token
     * @apiName ResendOtp
     * @apiGroup Auth
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/resend/token")
    public async resendOtpToken(request: Request, response: Response, next: NextFunction) {
        await this.authService.resendOtp(request.body.phoneNumber);
        return response.json({ success: true });
    }

    /**
     * @api{post} /api/user/auth/check/:token check token
     * @apiName checkToken
     * @apiGroup Auth
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/check/:token", passport.authenticate("jwt", { session: false }))
    public async checkToken(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true });
    }

    @httpGet("/secret", passport.authenticate("jwt", { session: false }))
    public async testToken(request: Request, response: Response, next: NextFunction) {
        response.json({ message: "Success! You can not see this without a token" });
    }

    /**
     * @api{post} /api/user/auth/logout logout
     * @apiName logout
     * @apiGroup Auth
     *
     * @apiHeader {String} authorization authorization.
     *
     * @apiSuccess {Json} success:true
     */
    @httpPost("/logout", passport.authenticate("jwt", { session: false }))
    public async logout(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true });
    }
}
