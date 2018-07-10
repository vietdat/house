import { getRepository, Repository, InsertResult } from "typeorm";
import { User } from "../entity/User";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";
import { TYPES } from "../libs/TYPES";
import { inject, injectable } from "inversify";
import { Constant } from "../all/constant";
import { Authenticate } from "../libs/authenticate";
import { CheckToken, ResendToken } from "../model/UserModel";
import { validate } from "class-validator";
import { myContainer } from "../libs/inversify.config";

@injectable()
export class UserService {
    private userRepository: Repository<User> = getRepository(User);
    private _authenticate = new Authenticate();
    private _utils = new Utils();

    public async search(body): Promise<User[]> {
        let instances: User[];

        try {
            instances = await this.userRepository.find();
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.ACCEPTED, "user"), err });
        }

        if (!instances || !instances.length) {
            return [];
        }
        return instances;
    }

    public async findOne(query: object): Promise<User> {
        let user: User;

        try {
            user = await this.userRepository.findOne(query);
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "user"), err });
        }

        if (!user) {
            throw ({ statusCode: StatusCode.NOT_FOUND, message: sprintf(Message.NOT_FOUND, "user") });
        }

        return user;
    }

    public async create(body): Promise<object> {
        let instance: object;
        body.active = false;
        body.otpToken = this._utils.generateOTPToken();
        const content = "Opt token cua ban la: " + body.otpToken;

        try {
            instance = await this.userRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "user") });
        }

        // Send otp code
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: body.phoneNumber, content }, await this._authenticate.createInternalToken());

        return this.userRepository.insert(instance);
    }

    public async checkOtpToken(phoneNumber, otpToken): Promise<boolean> {
        let user: User;
        console.log(otpToken);
        const data = new CheckToken(phoneNumber, otpToken);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            user = await this.userRepository.findOne({ phoneNumber, otpToken });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "user") });
        }

        user.active = true;
        if (user) {
            try {
                await this.userRepository.update(user.id, user);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "user") });
            }
        }

        return true;
    }

    public async resendOtp(phoneNumber): Promise<boolean> {
        let user: User;

        const data = new ResendToken(phoneNumber);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            user = await this.userRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "user") });
        }

        const content = "Opt token cua ban la: " + user.otpToken;
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: user.phoneNumber, content }, await this._authenticate.createInternalToken());

        return true;
    }

    public async update(id, user: object): Promise<object> {
        let instance: object;

        try {
            instance = await this.userRepository.update(id, user);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "user") });
        }

        return instance;
    }

    public async findOrCreateFacebook(facebook): Promise<User> {
        let user: User;
        const query = sprintf("SELECT * FROM public.\"user\" WHERE facebook->>'id'='%s'", facebook.id);
        try {
            user = await this.userRepository.query(query);
        } catch (err) {
            throw err;
        }

        if (!user) {
            const body = {
                facebook: {
                    id: facebook.id,
                    email: facebook.email
                },
                email: facebook.email,
                givenName: facebook.name.givenName,
                familyName: facebook.name.familyName,
                password: "fasjkdfbgu2w121"
            };
            try {
                user = await this.userRepository.create(body);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "user"), err });
            }

            await this.userRepository.insert(user);
        } else {
            user = user[0];
        }

        return user;
    }

    public async findOrCreateGoogle(google) {
        let user: User;
        const query = sprintf("SELECT * FROM public.\"user\" WHERE facebook->>'id'='%s'", google.id);
        try {
            user = await this.userRepository.query(query);
        } catch (err) {
            throw err;
        }

        if (!user) {
            const body = {
                facebook: {
                    id: google.id,
                    email: google.email
                },
                email: google.email,
                givenName: google.name.givenName,
                familyName: google.name.familyName,
                password: "fasjkdfbgu2w121"
            };
            try {
                user = await this.userRepository.create(body);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "user"), err });
            }

            await this.userRepository.insert(user);
        } else {
            user = user[0];
        }

        return user;
    }

    public async findOrCreateTwitter(twitter) {
        let user: User;
        const query = sprintf("SELECT * FROM public.\"user\" WHERE facebook->>'id'='%s'", twitter.id);
        try {
            user = await this.userRepository.query(query);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "user"), err });
        }

        if (!user) {
            const body = {
                facebook: {
                    id: twitter.id,
                    email: twitter.email
                },
                email: twitter.email,
                givenName: twitter.name.givenName,
                familyName: twitter.name.familyName,
                password: "fasjkdfbgu2w121"
            };
            try {
                user = await this.userRepository.create(body);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "user"), err });
            }

            await this.userRepository.insert(user);
        } else {
            user = user[0];
        }
        return user;
    }

    public async remove(id) {
        try {
            await this.userRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "user"), err });
        }

        return;
    }
}