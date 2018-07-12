import { Constant } from "../all/constant";
import * as jwt from "jsonwebtoken";
import { Utils } from "../libs/utils";

export class JWT {
    private utils = new Utils();

    public async createInternalToken(data) {
        let token;
        try {
            token = await jwt.sign(data, Constant.internalTokenKey);
        } catch (err) {
            throw err;
        }
        return token;
    }

    public async decodeInternalToken(token) {
        let dataDecode;
        if (!token) {
            throw Error("Missing token");
        }
        try {
            dataDecode = await jwt.verify(token, Constant.internalTokenKey);
        } catch (err) {
            throw err;
        }
        return dataDecode;
    }
}