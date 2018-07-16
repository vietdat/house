import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportFacebook from "passport-facebook";
import * as passportTwitter from "passport-twitter";
import * as passportGoogle from "passport-google-oauth";
import * as _ from "lodash";
import * as passportJWT from "passport-jwt";
import { StaffService } from "../service/StaffService";
import { Request, Response, NextFunction } from "express";

export class PassportConfig {
    private staffService = new StaffService();

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
            const staffService = new StaffService();
            // console.log("payload received", jwtPayload);
            let staff;
            try {
                staff = await staffService.findOne({ id: jwtPayload.id });
            } catch (err) {
                next(null, false);
            }

            staff ? next(null, staff) : next(null, false);
        });
        passport.use(strategy);

        passport.serializeUser<any, any>((staff, next) => {
            console.log("=============================");
            console.log(staff);
            next(undefined, staff.id);
        });

        passport.deserializeUser(async (id, next) => {
            let staff;
            try {
                console.log(id);
                staff = await this.staffService.findOne(id);
            } catch (err) {
                next(null, false);
            }
            staff ? next(null, staff) : next(null, false);
        });

        passport.use(new facebookStrategy({
            clientID: "823733734463471",
            clientSecret: "e492d9b28db6f1dc11f76113306f311e",
            callbackURL: "https://localhost:5000/auth/facebook",
            profileFields: ["name", "email", "link", "locale", "timezone"],
            passReqToCallback: true
        }, (req, accessToken, refreshToken, profile, next) => {
                const staffService = new StaffService();
                staffService.findOrCreateFacebook(profile).then((staff) => {
                    req.staff = staff;
                    staff ? next(null, staff) : next(new Error("Login facebook fail2112"));
                }).catch((err) => {console.log(err); next(err); });
            }
        ));

        passport.use(new googleStrategy({
            clientID: "348835430049-c0djdielndt2kgi667pj1esvfq5ogdtq.apps.googlestaffcontent.com",
            clientSecret: "cf86E9dNorD96kWtLk6Tjkfr",
            callbackURL: "http://localhost:3000/auth/google/"
        },
            async (req, accessToken, refreshToken, profile, next) => {
                const staffService = new StaffService();
                let staff;

                try {
                    staff = await staffService.findOrCreateGoogle(profile);
                } catch (err) {
                    next(err);
                }
                req.staff = staff;
                staff ? next(null, staff) : next("Login facebook fail");
            }
        ));

        passport.use(new twitterStrategy({
            consumerKey: "o9djcMxFpO83ckKYncOFG1nDh",
            consumerSecret: "ThcE4yRMjRrRLyPmXEPxffld54TZ5H77KKZOX2HSHHhTg6wTzo",
            callbackURL: "http://localhost:3000/auth/twitter/"
        },
            async (req, accessToken, refreshToken, profile, next) => {
                const staffService = new StaffService();
                let staff;
                try {
                    staff = await staffService.findOrCreateTwitter(profile);
                } catch (err) {
                    next(err);
                }
                req.staff = staff;
                staff ? next(null, staff) : next(new Error("Login facebook fail"));
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