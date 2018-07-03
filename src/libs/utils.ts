import { bcrypt }   from "bcrypt-nodejs";

export class Utils {
    public comparePassword = (plain, hash) => {
        let compare = true;
        if (plain && hash) {
            try {
                compare = bcrypt.compareSync(plain, hash);
            }
            catch (err) {
                throw 'Can not unhash password';
            }
        }
        if (!compare) {
            throw 'Password mismatch';
        }
        return compare;
    }

    public createError = (statusCode, message, err) => {
        return {
            statusCode: statusCode,
            message: message,
            err: err
        };
    };

    // public hashPassword = (plain) => hashPassword(plain);
}