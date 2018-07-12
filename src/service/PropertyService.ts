import { getRepository, Repository, InsertResult } from "typeorm";
import { Property } from "../entity/Property";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";

export class PropertyService {
    private propertyRepository: Repository<Property> = getRepository(Property);
    private utils = new Utils();
    public async search(query?: object): Promise<Property[]> {
        let instances: Property[];

        try {
            instances = await this.propertyRepository.find(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.CANNOT_FIND, "Property"), err));
        }

        if (!instances || !instances.length) {
            instances = [];
        }
        return instances;
    }

    public async findOne(query: object): Promise<Property> {
        let instance: Property;

        try {
            instance = await this.propertyRepository.findOne(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.NOT_FOUND, "Property"), err));
        }

        if (!instance) {
            throw (this.utils.createError(StatusCode.NOT_FOUND, sprintf(Message.NOT_FOUND, "Property")));
        }

        return instance;
    }

    public async create(body: object): Promise<InsertResult> {
        let instance: Property;
        try {
            instance = await this.propertyRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "Property") });
        }
        return this.propertyRepository.insert(instance);
    }

    public async update(id, property: object): Promise<object> {
        let instance: object;
        console.log("Property", property);
        try {
            instance = await this.propertyRepository.update(id, property);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "Property") });
        }

        return instance;
    }

    public async remove(id) {
        try {
            await this.propertyRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Property"), err });
        }

        return;
    }

    public async softDelete(id) {
        try {
            await this.propertyRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Property"), err });
        }

        return;
    }

    public async active(id) {
        try {
            await this.propertyRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_ACTIVE, "Property"), err });
        }

        return;
    }
}