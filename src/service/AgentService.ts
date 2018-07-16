import { getRepository, Repository, InsertResult } from "typeorm";
import { Agent } from "../entity/Agent";
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
import { UpdateAgentModel } from "../model/AgentModel";

@injectable()
export class AgentService {
    private agentRepository: Repository<Agent> = getRepository(Agent);
    private _authenticate = new Authenticate();
    private _utils = new Utils();

    public async search(body): Promise<object> {
        let instances: Agent[];
        let total: number;
        let pager;

        const searchData: object = new UpdateAgentModel(body);

        try {
            total = await this.agentRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "agent"), err });
        }

        pager = this._utils.createPager(body.pageNumber, body.pageSize, total);

        try {
            instances = await this.agentRepository.createQueryBuilder("agent").where(searchData).skip(pager.skip).take(pager.limit).getMany();
            total = await this.agentRepository.count(searchData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_REQUEST, message: sprintf(Message.CANNOT_FIND, "agent"), err });
        }

        if (!instances || !instances.length) {
            return [];
        }
        return { agents: instances, total };
    }

    public async findOne(query: object): Promise<Agent> {
        let agent: Agent;

        try {
            agent = await this.agentRepository.findOne(query);
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "agent"), err });
        }

        if (!agent) {
            throw ({ statusCode: StatusCode.NOT_FOUND, message: sprintf(Message.NOT_FOUND, "agent") });
        }

        return agent;
    }

    public async softdelete(id): Promise<boolean> {

        try {
            await this.agentRepository.update(id, { active: false });
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "agent"), err });
        }

        return true;
    }

    public async active(id): Promise<boolean> {

        try {
            await this.agentRepository.update(id, { active: true });
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "agent"), err });
        }

        return true;
    }

    public async create(body): Promise<object> {
        let instance;
        let wallet;

        body.active = false;
        body.otpToken = this._utils.generateOTPToken();
        body.referralCode = this._utils.generateOTPToken();

        const content = "Opt token cua ban la: " + body.otpToken;

        try {
            instance = await this.agentRepository.create(body);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "agent") });
        }

        // create wallet
        wallet = await this._utils.putAPI(sprintf(Constant.createApi, "wallet"), { phoneNumber: body.phoneNumber, content }, await this._authenticate.createInternalToken());
        instance.walletId = wallet.identifiers[0].id;

        // Send otp code
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: body.phoneNumber, content }, await this._authenticate.createInternalToken());

        return this.agentRepository.insert(instance);
    }

    public async update(id, agent): Promise<boolean> {
        let instance: object;
        const updateData: object = new UpdateAgentModel(agent);
        try {
            instance = await this.agentRepository.update(id, updateData);
        } catch (err) {
            throw err;
        }

        if (!instance) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "agent") });
        }

        return true;
    }

    public async findOrCreateFacebook(facebook): Promise<Agent> {
        let agent: Agent;
        const query = sprintf("SELECT * FROM public.\"agent\" WHERE facebook->>'id'='%s'", facebook.id);
        try {
            agent = await this.agentRepository.query(query);
        } catch (err) {
            throw err;
        }

        if (!agent) {
            const body = {
                facebook: {
                    id: facebook.id,
                    email: facebook.email
                },
                email: facebook.email,
                givenName: facebook.name.givenName,
                familyName: facebook.name.familyName,
                password: "fasjkdfbgu2w121"
            };
            try {
                agent = await this.agentRepository.create(body);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "agent"), err });
            }

            await this.agentRepository.insert(agent);
        } else {
            agent = agent[0];
        }

        return agent;
    }

    public async findOrCreateGoogle(google) {
        let agent: Agent;
        const query = sprintf("SELECT * FROM public.\"agent\" WHERE facebook->>'id'='%s'", google.id);
        try {
            agent = await this.agentRepository.query(query);
        } catch (err) {
            throw err;
        }

        if (!agent) {
            const body = {
                facebook: {
                    id: google.id,
                    email: google.email
                },
                email: google.email,
                givenName: google.name.givenName,
                familyName: google.name.familyName,
                password: "fasjkdfbgu2w121"
            };
            try {
                agent = await this.agentRepository.create(body);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "agent"), err });
            }

            await this.agentRepository.insert(agent);
        } else {
            agent = agent[0];
        }

        return agent;
    }

    public async findOrCreateTwitter(twitter) {
        let agent: Agent;
        const query = sprintf("SELECT * FROM public.\"agent\" WHERE facebook->>'id'='%s'", twitter.id);
        try {
            agent = await this.agentRepository.query(query);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "agent"), err });
        }

        if (!agent) {
            const body = {
                facebook: {
                    id: twitter.id,
                    email: twitter.email
                },
                email: twitter.email,
                givenName: twitter.name.givenName,
                familyName: twitter.name.familyName,
                password: "fasjkdfbgu2w121"
            };
            try {
                agent = await this.agentRepository.create(body);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_CREATE, "agent"), err });
            }

            await this.agentRepository.insert(agent);
        } else {
            agent = agent[0];
        }
        return agent;
    }

    public async remove(id) {
        try {
            await this.agentRepository.delete({ id });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_DELETE, "agent"), err });
        }

        return;
    }

    public async getWallet(walletId) {
        let wallet: object;

        try {
            wallet = await this._utils.getAPI(sprintf(Constant.findByIdApi, "wallet", walletId), await this._authenticate.createInternalToken());
        } catch (err) {
            throw ({ statusCode: StatusCode.ACCEPTED, message: sprintf(Message.CANNOT_FIND, "wallet"), err });
        }

        if (!wallet) {
            throw ({ statusCode: StatusCode.NOT_FOUND, message: sprintf(Message.NOT_FOUND, "wallet") });
        }

        return wallet;
    }
}