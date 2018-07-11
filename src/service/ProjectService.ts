import { getRepository, Repository, InsertResult } from "typeorm";
import { Project } from "../entity/Project";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";

export class ProjectService {
    private projectRepository: Repository<Project> = getRepository(Project);
    private utils = new Utils();
    public async search(query?: object): Promise<Project[]> {
        let instances: Project[];

        try {
            instances = await this.projectRepository.find(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.CANNOT_FIND, "project"), err));
        }

        if (!instances || !instances.length) {
            instances = [];
        }
        return instances;
    }

    public async findOne(query: object): Promise<Project> {
        let instance: Project;

        try {
            instance = await this.projectRepository.findOne(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.NOT_FOUND, "project"), err));
        }

        if (!instance) {
            throw (this.utils.createError(StatusCode.NOT_FOUND, sprintf(Message.NOT_FOUND, "project")));
        }

        return instance;
    }

    public async create(body: object): Promise<InsertResult> {
        let instance: Project;
        try {
            instance = await this.projectRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "project") });
        }
        return this.projectRepository.insert(instance);
    }

    public async update(id, project: object): Promise<object> {
        let instance: object;
        console.log("project", project);
        try {
            instance = await this.projectRepository.update(id, project);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "project") });
        }

        return instance;
    }

    public async remove(id) {
        try {
            await this.projectRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "project"), err });
        }

        return;
    }

    public async softDelete(id) {
        try {
            await this.projectRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "project"), err });
        }

        return;
    }

    public async active(id) {
        try {
            await this.projectRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_ACTIVE, "project"), err });
        }

        return;
    }
}