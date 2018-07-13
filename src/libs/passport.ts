import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportFacebook from "passport-facebook";
import * as passportTwitter from "passport-twitter";
import * as passportGoogle from "passport-google-oauth";
import * as _ from "lodash";
import * as passportJWT from "passport-jwt";
import { AdminService } from "../service/AdminService";
import { Request, Response, NextFunction } from "express";

export class PassportConfig {
    private adminService = new AdminService();

    public init() {
        const localStrategy = passportLocal.Strategy;
        const ExtractJwt = passportJWT.ExtractJwt;
        const jwtStrategy = passportJWT.Strategy;
        const facebookStrategy = passportFacebook.Strategy;
        const twitterStrategy = passportTwitter.Strategy;
        const googleStrategy = passportGoogle.OAuth2Strategy;

        const jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey: "Fami@123"
        };

        const strategy = new jwtStrategy(jwtOptions, async (jwtPayload, next) => {
            const adminService = new AdminService();
            // console.log("payload received", jwtPayload);
            let admin;
            try {
                admin = await adminService.findOne({ id: jwtPayload.id });
            } catch (err) {
                next(null, false);
            }

            admin ? next(null, admin) : next(null, false);
        });
        passport.use(strategy);

        passport.serializeUser<any, any>((admin, next) => {
            console.log("=============================");
            console.log(admin);
            next(undefined, admin.id);
        });

        passport.deserializeUser(async (id, next) => {
            let admin;
            try {
                console.log(id);
                admin = await this.adminService.findOne(id);
            } catch (err) {
                next(null, false);
            }
            admin ? next(null, admin) : next(null, false);
        });
    }

    /**
     * Login Required middleware.
     */
    public isAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    }

    /**
     * Authorization Required middleware.
     */
    public isAuthorized(req: Request, res: Response, next: NextFunction) {
        const provider = req.path.split("/").slice(-1)[0];

        if (_.find(req.user.tokens, { kind: provider })) {
            next();
        } else {
            res.redirect(`/auth/${provider}`);
        }
    }
}