import { injectable } from "inversify";
import * as request from "request-promise";

@injectable()
export class Utils {
    public createError = (statusCode: string, message: string, err: string): object => {
        return {
            statusCode,
            message,
            err
        };
    }

    public generateOTPToken = () => {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public postAPI = async (api, body, token) => {
        let result;
        try {
            result = await request({
                headers: {
                    authorization: token
                },
                uri: api,
                method: "POST",
                json: body
            });
        } catch (err) {
            throw err;
        }
        if (result.error) {
            throw result.error;
        }

        return result.data;
    }

    public putAPI = async (api, body, token) => {
        let result;
        try {
            result = await request({
                headers: {
                    authorization: token
                },
                uri: api,
                method: "PUT",
                json: body
            });
        } catch (err) {
            throw err;
        }
        if (result.error) {
            throw result.error;
        }

        return result.data;
    }
}