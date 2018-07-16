import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportFacebook from "passport-facebook";
import * as passportTwitter from "passport-twitter";
import * as passportGoogle from "passport-google-oauth";
import * as _ from "lodash";
import * as passportJWT from "passport-jwt";
import { AgentService } from "../service/AgentService";
import { Request, Response, NextFunction } from "express";

export class PassportConfig {
    private agentService = new AgentService();

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
            const agentService = new AgentService();
            // console.log("payload received", jwtPayload);
            let agent;
            try {
                agent = await agentService.findOne({ id: jwtPayload.id });
            } catch (err) {
                next(null, false);
            }

            agent ? next(null, agent) : next(null, false);
        });
        passport.use(strategy);

        passport.serializeUser<any, any>((agent, next) => {
            console.log("=============================");
            console.log(agent);
            next(undefined, agent.id);
        });

        passport.deserializeUser(async (id, next) => {
            let agent;
            try {
                console.log(id);
                agent = await this.agentService.findOne(id);
            } catch (err) {
                next(null, false);
            }
            agent ? next(null, agent) : next(null, false);
        });

        passport.use(new facebookStrategy({
            clientID: "823733734463471",
            clientSecret: "e492d9b28db6f1dc11f76113306f311e",
            callbackURL: "https://localhost:5000/auth/facebook",
            profileFields: ["name", "email", "link", "locale", "timezone"],
            passReqToCallback: true
        }, (req, accessToken, refreshToken, profile, next) => {
                const agentService = new AgentService();
                agentService.findOrCreateFacebook(profile).then((agent) => {
                    req.agent = agent;
                    agent ? next(null, agent) : next(new Error("Login facebook fail2112"));
                }).catch((err) => {console.log(err); next(err); });
            }
        ));

        passport.use(new googleStrategy({
            clientID: "348835430049-c0djdielndt2kgi667pj1esvfq5ogdtq.apps.googleagentcontent.com",
            clientSecret: "cf86E9dNorD96kWtLk6Tjkfr",
            callbackURL: "http://localhost:3000/auth/google/"
        },
            async (req, accessToken, refreshToken, profile, next) => {
                const agentService = new AgentService();
                let agent;

                try {
                    agent = await agentService.findOrCreateGoogle(profile);
                } catch (err) {
                    next(err);
                }
                req.agent = agent;
                agent ? next(null, agent) : next("Login facebook fail");
            }
        ));

        passport.use(new twitterStrategy({
            consumerKey: "o9djcMxFpO83ckKYncOFG1nDh",
            consumerSecret: "ThcE4yRMjRrRLyPmXEPxffld54TZ5H77KKZOX2HSHHhTg6wTzo",
            callbackURL: "http://localhost:3000/auth/twitter/"
        },
            async (req, accessToken, refreshToken, profile, next) => {
                const agentService = new AgentService();
                let agent;
                try {
                    agent = await agentService.findOrCreateTwitter(profile);
                } catch (err) {
                    next(err);
                }
                req.agent = agent;
                agent ? next(null, agent) : next(new Error("Login facebook fail"));
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