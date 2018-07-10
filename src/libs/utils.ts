import { bcrypt } from "bcrypt-nodejs";
import { IError } from "./error";

export class Utils {
    public createError = (data: IError): IError => {
        return data;
    }
}