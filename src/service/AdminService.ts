import { getRepository, Repository, InsertResult } from "typeorm";
import { Admin } from "../entity/Admin";
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
import { UpdateAdminModel } from "../model/AdminModel";

@injectable()
export class AdminService {
    private adminRepository: Repository<Admin> = getRepository(Admin);
    private _authenticate = new Authenticate();
    private _utils = new Utils();

    public async search(body): Promise<object> {
        let instances: Admin[];
        let total: number;
        let pager;

        const searchData: object = new UpdateAdminModel(body);

        try {
            total = await this.adminRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "admin"), err });
        }

        pager = this._utils.createPager(body.pageNumber, body.pageSize, total);

        try {
            instances = await this.adminRepository.createQueryBuilder("admin").where(searchData).skip(pager.skip).take(pager.limit).getMany();
            total = await this.adminRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "admin"), err });
        }

        if (!instances || !instances.length) {
            return [];
        }
        return { admins: instances, total };
    }

    public async findOne(query: object): Promise<Admin> {
        let admin: Admin;

        try {
            admin = await this.adminRepository.findOne(query);
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "admin"), err });
        }

        if (!admin) {
            throw ({ statusCode: StatusCode.NOT_FOUND, message: sprintf(Message.NOT_FOUND, "admin") });
        }

        return admin;
    }

    public async create(body): Promise<object> {
        let instance;

        try {
            instance = await this.adminRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "admin") });
        }

        return this.adminRepository.insert(instance);
    }

    public async update(id, admin): Promise<boolean> {
        let instance: object;
        const updateData: object = new UpdateAdminModel(admin);
        try {
            instance = await this.adminRepository.update(id, updateData);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "admin") });
        }

        return true;
    }

    public async remove(id) {
        try {
            await this.adminRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "admin"), err });
        }

        return;
    }
}