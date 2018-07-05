import { bcrypt } from "bcrypt-nodejs";

export class Utils {
    public comparePassword = (plain: string, hash: string): boolean => {
        let compare = true;
        if (plain && hash) {
            try {
                compare = bcrypt.compareSync(plain, hash);
            } catch (err) {
                throw new Error("Can not unhash password");
            }
        }
        if (!compare) {
            throw Error("Password mismatch");
        }
        return compare;
    }

    public createError = (statusCode: string, message: string, err: string): object => {
        return {
            statusCode,
            message,
            err
        };
    }

    // public hashPassword = (plain) => hashPassword(plain);
}