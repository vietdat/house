import { inject, injectable } from "inversify";
import { Request } from "express";
import { Constant } from "../all/constant";
import { sprintf } from "sprintf-js";
import { stringify } from "querystring";
import { Utils } from "../libs/utils";

@injectable()
export class CallService {
    public request: Request;
    public className: string;
    private utils = new Utils();
    public async create(className: string, request: Request, token?: string) {
        let property;
        let url;
        url = sprintf(Constant.API_CREATE, className);
        property = await this.utils.putAPI(url, request.body, token);
        return this.utils.createSuccessHandler(property);
    }

    public async update(className: string, request: Request, token?: string) {
        let property;
        let url;
        url = sprintf(Constant.API_UPDATE_BY_ID, className, request.params.id);
        property = await this.utils.postAPI(url, request.body, token);
        return this.utils.createSuccessHandler(property);
    }

    public async findById(className: string, request: Request, token?: string) {
        let property;
        let url;
        url = sprintf(Constant.API_GET_BY_ID, className, request.params.id);
        property = await this.utils.getAPI(url, token);
        return this.utils.createSuccessHandler(property);
    }

    public async search(className: string, request: Request, token?: string) {
        let property;
        let url;
        url = sprintf(Constant.API_SEARCH, className, stringify(request.query));
        property = await this.utils.getAPI(url, token);
        return this.utils.createSuccessHandler(property);
    }

    public async activeById(className: string, request: Request, token?: string) {
        let property;
        let url;
        url = sprintf(Constant.API_ACTIVE_BY_ID, className, request.params.id);
        property = await this.utils.getAPI(url, token);
        return this.utils.createSuccessHandler(property);
    }

    public async softDeleteById(className: string, request: Request, token?: string) {
        let property;
        let url;
        url = sprintf(Constant.API_SOFT_DELETE_BY_ID, className, request.params.id);
        property = await this.utils.getAPI(url, token);
        return this.utils.createSuccessHandler(property);
    }
}