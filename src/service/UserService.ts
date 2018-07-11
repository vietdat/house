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
import { validate } from "class-validator";
import { myContainer } from "../libs/inversify.config";
import { UpdateUserModel } from "../model/UserModel";

@injectable()
export class UserService {
    private userRepository: Repository<User> = getRepository(User);
    private _authenticate = new Authenticate();
    private _utils = new Utils();

    public async search(body): Promise<object> {
        let instances: User[];
        let total: number;
        let pager;

        const searchData: object = new UpdateUserModel(body);

        try {
            total = await this.userRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "user"), err });
        }

        pager = this._utils.createPager(body.pageNumber, body.pageSize, total);

        try {
            instances = await this.userRepository.createQueryBuilder("user").where(searchData).skip(pager.skip).take(pager.limit).getMany();
            total = await this.userRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "user"), err });
        }

        if (!instances || !instances.length) {
            return [];
        }
        return { users: instances, total };
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

    public async softdelete(id): Promise<boolean> {

        try {
            await this.userRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "user"), err });
        }

        return true;
    }

    public async active(id): Promise<boolean> {

        try {
            await this.userRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "user"), err });
        }

        return true;
    }

    public async create(body): Promise<object> {
        let instance;
        let wallet;

        body.active = false;
        body.otpToken = this._utils.generateOTPToken();
        body.referralCode = this._utils.generateOTPToken();

        const content = "Opt token cua ban la: " + body.otpToken;

        try {
            instance = await this.userRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "user") });
        }

        // create wallet
        wallet = await this._utils.putAPI(sprintf(Constant.createApi, "wallet"), { phoneNumber: body.phoneNumber, content }, await this._authenticate.createInternalToken());
        instance.walletId = wallet.identifiers[0].id;

        // Send otp code
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: body.phoneNumber, content }, await this._authenticate.createInternalToken());

        return this.userRepository.insert(instance);
    }

    public async update(id, user): Promise<boolean> {
        let instance: object;
        const updateData: object = new UpdateUserModel(user);
        try {
            instance = await this.userRepository.update(id, updateData);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "user") });
        }

        return true;
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

    public async getWallet(walletId) {
        let wallet: object;

        try {
            wallet = await this._utils.getAPI(sprintf(Constant.findByIdApi, "wallet", walletId), await this._authenticate.createInternalToken());
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "wallet"), err });
        }

        if (!wallet) {
            throw ({ statusCode: StatusCode.NOT_FOUND, message: sprintf(Message.NOT_FOUND, "wallet") });
        }

        return wallet;
    }
}