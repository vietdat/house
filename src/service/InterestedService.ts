import { getRepository, Repository, InsertResult } from "typeorm";
import { Interested } from "../entity/Interested";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";

export class InterestedService {
    private interestedRepository: Repository<Interested> = getRepository(Interested);
    private utils = new Utils();
    public async search(query?: object): Promise<Interested[]> {
        let instances: Interested[];

        try {
            instances = await this.interestedRepository.find(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.CANNOT_FIND, "Interested"), err));
        }

        if (!instances || !instances.length) {
            instances = [];
        }
        return instances;
    }

    public async findOne(query: object): Promise<Interested> {
        let instance: Interested;

        try {
            instance = await this.interestedRepository.findOne(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.NOT_FOUND, "Interested"), err));
        }

        if (!instance) {
            throw (this.utils.createError(StatusCode.NOT_FOUND, sprintf(Message.NOT_FOUND, "Interested")));
        }

        return instance;
    }

    public async create(body: object): Promise<InsertResult> {
        let instance: Interested;
        try {
            instance = await this.interestedRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "Interested") });
        }
        return this.interestedRepository.insert(instance);
    }

    public async update(id, property: object): Promise<object> {
        let instance: object;
        console.log("Interested", property);
        try {
            instance = await this.interestedRepository.update(id, property);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "Interested") });
        }

        return instance;
    }

    public async remove(id) {
        try {
            await this.interestedRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Interested"), err });
        }

        return;
    }

    public async softDelete(id) {
        try {
            await this.interestedRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Interested"), err });
        }

        return;
    }

    public async active(id) {
        try {
            await this.interestedRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_ACTIVE, "Interested"), err });
        }

        return;
    }
}