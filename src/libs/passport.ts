import * as passport from "passport";
import * as passportLocal from "passport-local";
import passportFacebook from "passport-facebook";
import * as _ from "lodash";
import * as passportJWT from "passport-jwt";
import { encryptionService } from "../libs/encryption";
import { UserService } from "../service/UserService";
import { Request, Response, NextFunction } from "express";

// const FacebookStrategy = passportFacebook.Strategy;

export class passportConfig {
    private userService = new UserService();

    init() {
        const LocalStrategy = passportLocal.Strategy;
        const ExtractJwt = passportJWT.ExtractJwt;
        const JwtStrategy = passportJWT.Strategy;

        var jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey: "Fami@123"
        };

        var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            let userService = new UserService();
            // console.log('payload received', jwt_payload);
            userService.findOne({ id: jwt_payload.id })
            .then(user => {
                if (user) {
                    next(null, user);
                } else {
                    next(null, false);
                }
            });
        });
        passport.use(strategy);

        passport.serializeUser<any, any>((user, done) => {
            console.log('as');
            done(undefined, user.id);
        });

        passport.deserializeUser((id, done) => {
            this.userService.findOne(id).then(user => {
                done(null, user);
            });
        });

        // passport.use(new LocalStrategy((email, password, done) => {
        //     console.log('as21');
        //     this.userService.findOne({ email: email })
        //         .then(user => {
        //             if (!user) {
        //                 return done(undefined, false, { message: `Email ${email} not found.` });
        //             }

        //             return done(null, user);
        //             // console.log("sdhkh faskh sdfh kfsakh");
        //             // encryptionService.compare(user.password);
        //         })
        //         .catch(err => {
        //             return done(err);
        //         });
        // }));

    }

    /**
     * Login Required middleware.
     */
    isAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    };

    /**
     * Authorization Required middleware.
     */
    isAuthorized(req: Request, res: Response, next: NextFunction) {
        const provider = req.path.split("/").slice(-1)[0];

        if (_.find(req.user.tokens, { kind: provider })) {
            next();
        } else {
            res.redirect(`/auth/${provider}`);
        }
    };
}