import { getRepository, Repository, InsertResult } from "typeorm";
import { Wallet } from "../entity/Wallet";
import { sprintf } from "sprintf-js";
import { StatusCode } from "../all/status-code";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";
import { WalletModel } from "../model/WalletModel";

export class WalletService {
    private walletRepository: Repository<Wallet> = getRepository(Wallet);
    private utils = new Utils();
    public async search(query): Promise<object> {
        let instances: Wallet[];
        let total: number;
        let pager;

        const searchData: object = new WalletModel(query);

        try {
            total = await this.walletRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "wallet"), err });
        }

        pager = this.utils.createPager(query.pageNumber, query.pageSize, total);

        try {
            instances = await this.walletRepository.createQueryBuilder("wallet").where(searchData).skip(pager.skip).take(pager.limit).getMany();
            total = await this.walletRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "wallet"), err });
        }

        if (!instances || !instances.length) {
            return [];
        }
        return { wallets: instances, total };
    }

    public async findOne(query: object): Promise<Wallet> {
        let instance: Wallet;

        try {
            instance = await this.walletRepository.findOne(query);
        } catch (err) {
            throw (this.utils.createError(StatusCode.BAD_REQUEST, sprintf(Message.NOT_FOUND, "wallet"), err));
        }

        if (!instance) {
            throw (this.utils.createError(StatusCode.NOT_FOUND, sprintf(Message.NOT_FOUND, "wallet")));
        }

        return instance;
    }

    public async create(body: object): Promise<InsertResult> {
        let instance: Wallet;
        try {
            instance = await this.walletRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "wallet") });
        }
        return this.walletRepository.insert(instance);
    }

    public async update(id, wallet: object): Promise<object> {
        let instance: object;
        console.log("wallet", wallet);
        try {
            instance = await this.walletRepository.update(id, wallet);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "wallet") });
        }

        return instance;
    }

    public async remove(id) {
        try {
            await this.walletRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "wallet"), err });
        }

        return;
    }

    public async softDelete(id) {
        try {
            await this.walletRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "wallet"), err });
        }

        return;
    }

    public async active(id) {
        try {
            await this.walletRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_ACTIVE, "wallet"), err });
        }

        return;
    }
}