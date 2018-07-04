import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportFacebook from "passport-facebook";
import * as passportTwitter from "passport-twitter";
import * as passportGoogle from "passport-google-oauth";
import * as _ from "lodash";
import * as passportJWT from "passport-jwt";
import { encryptionService } from "../libs/encryption";
import { UserService } from "../service/UserService";
import { Request, Response, NextFunction } from "express";

export class passportConfig {
    private userService = new UserService();

    init() {
        const LocalStrategy = passportLocal.Strategy;
        const ExtractJwt = passportJWT.ExtractJwt;
        const JwtStrategy = passportJWT.Strategy;
        const FacebookStrategy = passportFacebook.Strategy;
        const TwitterStrategy = passportTwitter.Strategy;
        const GoogleStrategy = passportGoogle.OAuth2Strategy;

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

        passport.use(new FacebookStrategy({
            clientID: "823733734463471",
            clientSecret: "e492d9b28db6f1dc11f76113306f311e",
            callbackURL: "http://localhost:3000/auth/facebook/"
        },
            function (accessToken, refreshToken, profile, cb) {
                let userService = new UserService();
                userService.findOrCreateFacebook(profile)
                    .then(user => {
                        if (user) {
                            return cb(null, user);
                        } else {
                            return cb('Login facebook fail');
                        }
                    });
            }
        ));

        passport.use(new GoogleStrategy({
            clientID: "348835430049-c0djdielndt2kgi667pj1esvfq5ogdtq.apps.googleusercontent.com",
            clientSecret: "cf86E9dNorD96kWtLk6Tjkfr",
            callbackURL: "http://localhost:3000/auth/google/"
        },
            function (accessToken, refreshToken, profile, cb) {
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

        passport.use(new TwitterStrategy({
            consumerKey: "o9djcMxFpO83ckKYncOFG1nDh",
            consumerSecret: "ThcE4yRMjRrRLyPmXEPxffld54TZ5H77KKZOX2HSHHhTg6wTzo",
            callbackURL: "http://localhost:3000/auth/twitter/"
        },
            function (accessToken, refreshToken, profile, cb) {
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