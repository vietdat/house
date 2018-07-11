import { Message } from "../all/message";

export class Utils {
    public createError = (statusCode: number, message: string, err?: string): object => {
        return {
            statusCode,
            message,
            err
        };
    }

    public createSuccessResponse = (dataReturn: object): any => {
        return {
            success: true,
            data: dataReturn
        };
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

    // public hashPassword = (plain) => hashPassword(plain);
}