import { injectable } from "inversify";
import * as request from "request-promise";
import { Message } from "../all/message";

@injectable()
export class Utils {
    public createError = (statusCode: string, message: string, err: string): object => {
        return {
            statusCode,
            message,
            err
        };
    }

    public createSuccessHandler = (data: object): object => {
        return {
            success: true,
            data
        };
    }

    public generateOTPToken = () => {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public createPager = (pageNumber?: number, pageSize?: number, maxPageSize?: number): object => {
        pageNumber = pageNumber ? pageNumber : 1;
        pageSize = pageSize ? pageSize : 10;

        pageSize = pageSize === -1 ? 99999 : pageSize;

        if (pageSize === 0) {
            pageSize = 10; // default min
        }

        if (pageNumber <= 0) {
            pageNumber = 1;
        }

        if (maxPageSize && (pageNumber - 1) * pageSize > maxPageSize) {
            throw Error(Message.PAGE_SIZE_TOO_LARGE);
        }

        return {
            limit: pageSize,
            skip: (pageNumber - 1) * pageSize
        };
    }

    public postAPI = async (api, body, token?) => {
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

    public putAPI = async (api, body, token?) => {
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
        return result;
    }

    public getAPI = async (api, token?) => {
        let result;
        try {
            result = await request({
                headers: {
                    authorization: token
                },
                uri: api,
                method: "GET",
                json: true
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