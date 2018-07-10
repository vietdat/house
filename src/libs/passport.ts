import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as _ from "lodash";
import * as passportJWT from "passport-jwt";
import { Request, Response, NextFunction } from "express";

export class PassportConfig {
    public init() {
        const localStrategy = passportLocal.Strategy;
        const ExtractJwt = passportJWT.ExtractJwt;
        const jwtStrategy = passportJWT.Strategy;

        const jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey: "Fami@123@123"
        };

        const strategy = new jwtStrategy(jwtOptions, async (jwtPayload, next) => {
            next(null, true);
        });
        passport.use(strategy);

        passport.serializeUser<any, any>((user, next) => {
            next(undefined, user);
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