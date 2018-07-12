import { getRepository, Repository, InsertResult } from "typeorm";
import { PropertyType } from "../entity/PropertyType";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";

export class PropertyTypeService {
    private propertyTypeRepository: Repository<PropertyType> = getRepository(PropertyType);
    private utils = new Utils();
    public async search(query?: object): Promise<PropertyType[]> {
        let instances: PropertyType[];

        try {
            instances = await this.propertyTypeRepository.find(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.CANNOT_FIND, "PropertyType"), err));
        }

        if (!instances || !instances.length) {
            instances = [];
        }
        return instances;
    }

    public async findOne(query: object): Promise<PropertyType> {
        let instance: PropertyType;

        try {
            instance = await this.propertyTypeRepository.findOne(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.NOT_FOUND, "PropertyType"), err));
        }

        if (!instance) {
            throw (this.utils.createError(StatusCode.NOT_FOUND, sprintf(Message.NOT_FOUND, "PropertyType")));
        }

        return instance;
    }

    public async create(body: object): Promise<InsertResult> {
        let instance: PropertyType;
        try {
            instance = await this.propertyTypeRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "PropertyType") });
        }
        return this.propertyTypeRepository.insert(instance);
    }

    public async update(id, property: object): Promise<object> {
        let instance: object;
        console.log("PropertyType", property);
        try {
            instance = await this.propertyTypeRepository.update(id, property);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "PropertyType") });
        }

        return instance;
    }

    public async remove(id) {
        try {
            await this.propertyTypeRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "PropertyType"), err });
        }

        return;
    }

    public async softDelete(id) {
        try {
            await this.propertyTypeRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "PropertyType"), err });
        }

        return;
    }

    public async active(id) {
        try {
            await this.propertyTypeRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_ACTIVE, "PropertyType"), err });
        }

        return;
    }
}