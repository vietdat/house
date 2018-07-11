import { NextFunction, Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { FileService } from "../service/FileService";
import { Authenticate } from "../libs/authenticate";

@controller("/api/file")
export class FileController {
    public static TARGET_NAME: string = "FileController - 1";
    private fileService = new FileService();

    @httpPost("/upload")
    public async uploadFile(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.fileService.uploadFile(request, response)});
    }

    // @httpPost("/multi/upload", new Authenticate().authInternalToken)
    // public async uploadMultiFile(request: Request, response: Response, next: NextFunction) {
    //     return response.json({ success: true, data: await this.fileService.uploadMultiFile(request.body.efiles, request.body.subject, request.body.content) });
    // }

    // @httpGet("/:folder/:fileName", new Authenticate().authInternalToken)
    // public async getFile(request: Request, response: Response, next: NextFunction) {
    //     return response.json({ success: true, data: await this.fileService.getFile(request.body.efiles, request.body.subject, request.body.content) });
    // }
}
