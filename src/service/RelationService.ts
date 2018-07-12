import { getRepository, Repository, InsertResult } from "typeorm";
import { Relation } from "../entity/Relation";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";

export class RelationService {
    private relationRepository: Repository<Relation> = getRepository(Relation);
    private utils = new Utils();
    public async search(query?: object): Promise<Relation[]> {
        let instances: Relation[];

        try {
            instances = await this.relationRepository.find(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.CANNOT_FIND, "Relation"), err));
        }

        if (!instances || !instances.length) {
            instances = [];
        }
        return instances;
    }

    public async findOne(query: object): Promise<Relation> {
        let instance: Relation;

        try {
            instance = await this.relationRepository.findOne(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.NOT_FOUND, "Relation"), err));
        }

        if (!instance) {
            throw (this.utils.createError(StatusCode.NOT_FOUND, sprintf(Message.NOT_FOUND, "Relation")));
        }

        return instance;
    }

    public async create(body: object): Promise<InsertResult> {
        let instance: Relation;
        try {
            instance = await this.relationRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "Relation") });
        }
        return this.relationRepository.insert(instance);
    }

    public async update(id, property: object): Promise<object> {
        let instance: object;
        console.log("Relation", property);
        try {
            instance = await this.relationRepository.update(id, property);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "Relation") });
        }

        return instance;
    }

    public async remove(id) {
        try {
            await this.relationRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Relation"), err });
        }

        return;
    }

    public async softDelete(id) {
        try {
            await this.relationRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Relation"), err });
        }

        return;
    }

    public async active(id) {
        try {
            await this.relationRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_ACTIVE, "Relation"), err });
        }

        return;
    }
}