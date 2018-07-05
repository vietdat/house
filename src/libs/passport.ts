import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportFacebook from "passport-facebook";
import * as passportTwitter from "passport-twitter";
import * as passportGoogle from "passport-google-oauth";
import * as _ from "lodash";
import * as passportJWT from "passport-jwt";
import { UserService } from "../service/UserService";
import { Request, Response, NextFunction } from "express";

export class PassportConfig {
    private userService = new UserService();

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
            const userService = new UserService();
            // console.log('payload received', jwtPayload);
            let user;
            try {
                user = await userService.findOne({ id: jwtPayload.id });
            } catch (err) {
                next(null, false);
            }

            user ? next(null, user) : next(null, false);
        });
        passport.use(strategy);

        passport.serializeUser<any, any>((user, next) => {
            next(undefined, user.id);
        });

        passport.deserializeUser(async (id, next) => {
            let user;
            try {
                user = await this.userService.findOne(id);
            } catch (err) {
                next(null, false);
            }
            user ? next(null, user) : next(null, false);
        });

        passport.use(new facebookStrategy({
            clientID: "823733734463471",
            clientSecret: "e492d9b28db6f1dc11f76113306f311e",
            callbackURL: "https://localhost:5000/auth/facebook",
            profileFields: ["name", "email", "link", "locale", "timezone"],
            passReqToCallback: true
        },
            async (accessToken, refreshToken, profile, next) => {
                const userService = new UserService();
                let user;
                try {
                    user = await userService.findOrCreateFacebook(profile)
                } catch (err) {
                    next(err);
                }
                user ? next(null, user) : next(new Error("Login facebook fail"));
            }
        ));

        passport.use(new googleStrategy({
            clientID: "348835430049-c0djdielndt2kgi667pj1esvfq5ogdtq.apps.googleusercontent.com",
            clientSecret: "cf86E9dNorD96kWtLk6Tjkfr",
            callbackURL: "http://localhost:3000/auth/google/"
        },
            function (req, accessToken, refreshToken, profile, cb) {
                let userService = new UserService();
                userService.findOrCreateGoogle(profile)
                    .then(user => {
                        if (user) {
                            return cb(null, user);
                        } else {
                            return cb('Login facebook fail');
                        }
                    });
            }
        ));

        passport.use(new twitterStrategy({
            consumerKey: "o9djcMxFpO83ckKYncOFG1nDh",
            consumerSecret: "ThcE4yRMjRrRLyPmXEPxffld54TZ5H77KKZOX2HSHHhTg6wTzo",
            callbackURL: "http://localhost:3000/auth/twitter/"
        },
            function (req, accessToken, refreshToken, profile, cb) {
                let userService = new UserService();
                userService.findOrCreateTwitter(profile)
                    .then(user => {
                        if (user) {
                            return cb(null, user);
                        } else {
                            return cb('Login facebook fail');
                        }
                    });
            }
        ));
    }

    /**
     * Login Required middleware.
     */
    public isAuthenticated(req: Request, res: Response, next: NextFunction) {
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