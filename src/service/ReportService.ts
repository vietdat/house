import { getRepository, Repository, InsertResult } from "typeorm";
import { Report } from "../entity/Report";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";

export class ReportService {
    private propertyRepository: Repository<Report> = getRepository(Report);
    private utils = new Utils();
    public async search(query?: object): Promise<Report[]> {
        let instances: Report[];

        try {
            instances = await this.propertyRepository.find(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.CANNOT_FIND, "Report"), err));
        }

        if (!instances || !instances.length) {
            instances = [];
        }
        return instances;
    }

    public async findOne(query: object): Promise<Report> {
        let instance: Report;

        try {
            instance = await this.propertyRepository.findOne(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.NOT_FOUND, "Report"), err));
        }

        if (!instance) {
            throw (this.utils.createError(StatusCode.NOT_FOUND, sprintf(Message.NOT_FOUND, "Report")));
        }

        return instance;
    }

    public async create(body: object): Promise<InsertResult> {
        let instance: Report;
        try {
            instance = await this.propertyRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "Report") });
        }
        return this.propertyRepository.insert(instance);
    }

    public async update(id, property: object): Promise<object> {
        let instance: object;
        console.log("Report", property);
        try {
            instance = await this.propertyRepository.update(id, property);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "Report") });
        }

        return instance;
    }

    public async remove(id) {
        try {
            await this.propertyRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Report"), err });
        }

        return;
    }

    public async softDelete(id) {
        try {
            await this.propertyRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Report"), err });
        }

        return;
    }

    public async active(id) {
        try {
            await this.propertyRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_ACTIVE, "Report"), err });
        }

        return;
    }
}