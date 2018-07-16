import { getRepository, Repository, InsertResult } from "typeorm";
import { Staff } from "../entity/Staff";
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
import { UpdateStaffModel } from "../model/StaffModel";

@injectable()
export class StaffService {
    private staffRepository: Repository<Staff> = getRepository(Staff);
    private _authenticate = new Authenticate();
    private _utils = new Utils();

    public async search(body): Promise<object> {
        let instances: Staff[];
        let total: number;
        let pager;

        const searchData: object = new UpdateStaffModel(body);

        try {
            total = await this.staffRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "staff"), err });
        }

        pager = this._utils.createPager(body.pageNumber, body.pageSize, total);

        try {
            instances = await this.staffRepository.createQueryBuilder("staff").where(searchData).skip(pager.skip).take(pager.limit).getMany();
            total = await this.staffRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "staff"), err });
        }

        if (!instances || !instances.length) {
            return [];
        }
        return { staffs: instances, total };
    }

    public async findOne(query: object): Promise<Staff> {
        let staff: Staff;

        try {
            staff = await this.staffRepository.findOne(query);
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "staff"), err });
        }

        if (!staff) {
            throw ({ statusCode: StatusCode.NOT_FOUND, message: sprintf(Message.NOT_FOUND, "staff") });
        }

        return staff;
    }

    public async softdelete(id): Promise<boolean> {

        try {
            await this.staffRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "staff"), err });
        }

        return true;
    }

    public async active(id): Promise<boolean> {

        try {
            await this.staffRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "staff"), err });
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
            instance = await this.staffRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "staff") });
        }

        // create wallet
        wallet = await this._utils.putAPI(sprintf(Constant.createApi, "wallet"), { phoneNumber: body.phoneNumber, content }, await this._authenticate.createInternalToken());
        instance.walletId = wallet.identifiers[0].id;

        // Send otp code
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: body.phoneNumber, content }, await this._authenticate.createInternalToken());

        return this.staffRepository.insert(instance);
    }

    public async update(id, staff): Promise<boolean> {
        let instance: object;
        const updateData: object = new UpdateStaffModel(staff);
        try {
            instance = await this.staffRepository.update(id, updateData);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "staff") });
        }

        return true;
    }

    public async findOrCreateFacebook(facebook): Promise<Staff> {
        let staff: Staff;
        const query = sprintf("SELECT * FROM public.\"staff\" WHERE facebook->>'id'='%s'", facebook.id);
        try {
            staff = await this.staffRepository.query(query);
        } catch (err) {
            throw err;
        }

        if (!staff) {
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
                staff = await this.staffRepository.create(body);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "staff"), err });
            }

            await this.staffRepository.insert(staff);
        } else {
            staff = staff[0];
        }

        return staff;
    }

    public async findOrCreateGoogle(google) {
        let staff: Staff;
        const query = sprintf("SELECT * FROM public.\"staff\" WHERE facebook->>'id'='%s'", google.id);
        try {
            staff = await this.staffRepository.query(query);
        } catch (err) {
            throw err;
        }

        if (!staff) {
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
                staff = await this.staffRepository.create(body);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "staff"), err });
            }

            await this.staffRepository.insert(staff);
        } else {
            staff = staff[0];
        }

        return staff;
    }

    public async findOrCreateTwitter(twitter) {
        let staff: Staff;
        const query = sprintf("SELECT * FROM public.\"staff\" WHERE facebook->>'id'='%s'", twitter.id);
        try {
            staff = await this.staffRepository.query(query);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "staff"), err });
        }

        if (!staff) {
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
                staff = await this.staffRepository.create(body);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "staff"), err });
            }

            await this.staffRepository.insert(staff);
        } else {
            staff = staff[0];
        }
        return staff;
    }

    public async remove(id) {
        try {
            await this.staffRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "staff"), err });
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