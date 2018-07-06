
import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";

export interface IError {
    statusCode?: number;
    message: string;
    err?: string;
}

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    public error(error: any, request: any, response: any, next: (err: any) => any) {
        console.log("do something...");
        next(error);
    }

}