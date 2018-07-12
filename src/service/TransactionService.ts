import { getRepository, Repository, InsertResult } from "typeorm";
import { Transaction } from "../entity/Transaction";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";

export class TransactionService {
    private transactionRepository: Repository<Transaction> = getRepository(Transaction);
    private utils = new Utils();
    public async search(query?: object): Promise<Transaction[]> {
        let instances: Transaction[];

        try {
            instances = await this.transactionRepository.find(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.CANNOT_FIND, "Transaction"), err));
        }

        if (!instances || !instances.length) {
            instances = [];
        }
        return instances;
    }

    public async findOne(query: object): Promise<Transaction> {
        let instance: Transaction;

        try {
            instance = await this.transactionRepository.findOne(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.NOT_FOUND, "Transaction"), err));
        }

        if (!instance) {
            throw (this.utils.createError(StatusCode.NOT_FOUND, sprintf(Message.NOT_FOUND, "Transaction")));
        }

        return instance;
    }

    public async create(body: object): Promise<InsertResult> {
        let instance: Transaction;
        try {
            instance = await this.transactionRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "Transaction") });
        }
        return this.transactionRepository.insert(instance);
    }

    public async update(id, property: object): Promise<object> {
        let instance: object;
        console.log("Transaction", property);
        try {
            instance = await this.transactionRepository.update(id, property);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "Transaction") });
        }

        return instance;
    }

    public async remove(id) {
        try {
            await this.transactionRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "Transaction"), err });
        }

        return;
    }
}