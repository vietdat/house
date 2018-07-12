import { JWT } from "./jwtLib";
import { NextFunction, Request, Response, json } from "express";
import { injectable } from "inversify";

@injectable()
export class Authenticate {
    public async createInternalToken(id?, role?): Promise<string> {
        let token: string;
        const jwt = new JWT();
        const dataToken = {
            id,
            role
        };
        token = await jwt.createInternalToken(dataToken);
        return token;
    }

    public async authInternalToken(request: Request, response: Response, next: NextFunction) {
        try {
            const jwt = new JWT();
            const headers = ["X-Access-Token", "authorization"];
            let i;
            let token;
            for (i = 0; i < headers.length; i++) {
                if (request.header(headers[i])) {
                    token = request.header(headers[i]);
                }
            }
            console.log(await jwt.createInternalToken({id: "1234"}));
            const data = await jwt.decodeInternalToken(token);

            if (!data) { next("err"); } else { next(null); }
        } catch (err) {
            console.log("err: ", err);
            next(err);
        }
    }
}