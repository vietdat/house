import { getRepository, Repository, InsertResult } from "typeorm";
import { Comment } from "../entity/Comment";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";

export class CommentService {
    private commentRepository: Repository<Comment> = getRepository(Comment);
    private utils = new Utils();
    public async search(query?: object): Promise<Comment[]> {
        let instances: Comment[];

        try {
            instances = await this.commentRepository.find(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.CANNOT_FIND, "Comment"), err));
        }

        if (!instances || !instances.length) {
            instances = [];
        }
        return instances;
    }

    public async findOne(query: object): Promise<Comment> {
        let instance: Comment;

        try {
            instance = await this.commentRepository.findOne(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.NOT_FOUND, "Comment"), err));
        }

        if (!instance) {
            throw (this.utils.createError(StatusCode.NOT_FOUND, sprintf(Message.NOT_FOUND, "Comment")));
        }

        return instance;
    }

    public async create(body: object): Promise<InsertResult> {
        let instance: Comment;
        try {
            instance = await this.commentRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "Comment") });
        }
        return this.commentRepository.insert(instance);
    }

    public async update(id, property: object): Promise<object> {
        let instance: object;
        console.log("Comment", property);
        try {
            instance = await this.commentRepository.update(id, property);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "Comment") });
        }

        return instance;
    }

    public async remove(id) {
        try {
            await this.commentRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Comment"), err });
        }

        return;
    }

    public async softDelete(id) {
        try {
            await this.commentRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Comment"), err });
        }

        return;
    }

    public async active(id) {
        try {
            await this.commentRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_ACTIVE, "Comment"), err });
        }

        return;
    }
}