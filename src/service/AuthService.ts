import { getRepository, Repository } from "typeorm";
import { Agent } from "../entity/Agent";
import { sprintf } from "sprintf-js";
import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { Strategy, ExtractJwt } from "passport-jwt";
import { StatusCode } from "../all/status-code";
import { encryptionService } from "../libs/encryption";
import { Message } from "../all/message";
import { Utils } from "../libs/utils";
import { Constant } from "../all/constant";
import { Authenticate } from "../libs/authenticate";
import { CheckToken, ResendToken, CheckPhoneExistModel, ForgotPasswordModel, UpdatePasswordModel } from "../model/AuthModel";
import { validate } from "class-validator";

export class AuthService {
    private agentRepository: Repository<Agent> = getRepository(Agent);
    private agent = new Agent();
    private _utils = new Utils();
    private _authenticate = new Authenticate();

    public initialize = () => {
        passport.use("jwt", this.getStrategy());
        return passport.initialize();
    }

    public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

    public async login(phoneNumber, password): Promise<object> {
        try {
            const agent = await this.agentRepository.findOne({ phoneNumber });

            if (agent === null) {
                throw new Error("Agent not found");
            }

            const success = await encryptionService.compare(password, agent.password);
            if (success === false) {
                throw new Error(Message.PASSWORD_INCORRECT);
            }

            if (!agent.active) {
                throw new Error(sprintf(Message.NOT_ACTIVE, agent));
            }
            return this.genToken(agent);
        } catch (err) {
            throw err;
        }
    }

    public async forgotpassword(phoneNumber): Promise<boolean> {
        let agent: Agent;

        const params = new ForgotPasswordModel(phoneNumber);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            agent = await this.agentRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "agent"), err });
        }

        const internalToken: string = await this._authenticate.createInternalToken();

        if (!agent) {
            throw new Error("Agent not found");
        }

        agent.password = this._utils.generateOTPToken().toString();

        let updateData: Agent;
        updateData = await this.agentRepository.create(agent);
        // Update password
        try {
            await this.agentRepository.save(updateData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "agent"), err });
        }

        // Send new password to phone
        const content = "Password moi cua ban la: " + agent.password;
        console.log(content);
        // this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: agent.phoneNumber, content }, internalToken);

        return true;
    }

    public async updatepassword(phoneNumber, newPassword, oldPassword): Promise<boolean> {
        let agent: Agent;

        const params = new UpdatePasswordModel(phoneNumber, newPassword, oldPassword);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            agent = await this.agentRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "agent"), err });
        }

        const internalToken: string = await this._authenticate.createInternalToken();

        if (!agent) {
            throw new Error("Agent not found");
        }

        const success = await encryptionService.compare(oldPassword, agent.password);
        if (success === false) {
            throw new Error(Message.PASSWORD_INCORRECT);
        }

        let updateData: Agent;
        agent.password = newPassword;
        updateData = await this.agentRepository.create(agent);

        // Update password
        try {
            await this.agentRepository.save(updateData);
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "agent"), err });
        }

        // Send new password to phone
        const content = "Password moi cua ban la: " + agent.password;
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: agent.phoneNumber, content }, internalToken);

        return true;
    }

    public async checkPhoneExist(phoneNumber): Promise<boolean> {
        let agent: Agent;

        const params = new CheckPhoneExistModel(phoneNumber);
        const errors = await validate(params);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            agent = await this.agentRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "agent"), err });
        }

        if (!agent) {
            return false;
        }

        return true;
    }

    public async checkOtpToken(phoneNumber, otpToken): Promise<boolean> {
        let agent: Agent;
        const data = new CheckToken(phoneNumber, otpToken);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            agent = await this.agentRepository.findOne({ phoneNumber, otpToken });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "agent") });
        }

        agent.active = true;
        if (agent) {
            try {
                await this.agentRepository.update(agent.id, agent);
            } catch (err) {
                throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_UPDATE, "agent") });
            }
        }

        return true;
    }

    public async resendOtp(phoneNumber): Promise<boolean> {
        let agent: Agent;

        const data = new ResendToken(phoneNumber);
        const errors = await validate(data);
        if (errors.length > 0) {
            throw Error(errors.toString());
        }

        try {
            agent = await this.agentRepository.findOne({ phoneNumber });
        } catch (err) {
            throw ({ statusCode: StatusCode.BAD_GATEWAY, message: sprintf(Message.CANNOT_FIND, "agent") });
        }

        const content = "Opt token cua ban la: " + agent.otpToken;
        this._utils.postAPI(Constant.sendSmsApi, { phoneNumber: agent.phoneNumber, content }, await this._authenticate.createInternalToken());

        return true;
    }

    public async loginFacebook(agent): Promise<object> {
        try {
            return this.genToken(agent);
        } catch (err) {
            throw err;
        }
    }

    public async loginGoogle(agent): Promise<object> {
        try {
            return this.genToken(agent);
        } catch (err) {
            throw err;
        }
    }

    public async loginTwitter(agent): Promise<object> {
        try {
            return this.genToken(agent);
        } catch (err) {
            throw err;
        }
    }

    public getStrategy = (): Strategy => {
        const params = {
            secretOrKey: "Fami@123",
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            passReqToCallback: true
        };

        return new Strategy(params, async (req, payload: any, next) => {
            let agent;
            try {
                agent = await this.agentRepository.findOne({ email: payload.email });
            } catch (err) {
                return next(err);
            }
            if (agent === null) {
                return next(null, false, { message: "The agent in the token was not found" });
            }

            return next(null, { id: agent.id, email: agent.email });
        });
    }

    private genToken = (agent: Agent): object => {
        const expires = moment().utc().add({ days: 7 }).unix();
        const token = jwt.encode({
            exp: expires,
            id: agent.id
        }, "Fami@123");

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            agent: agent.id
        };
    }
}
