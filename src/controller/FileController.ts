import { NextFunction, Request, Response } from "express";
import { controller, httpPost, httpGet } from "inversify-express-utils";
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

    @httpPost("/multi/upload")
    public async uploadMultiFile(request: Request, response: Response, next: NextFunction) {
        return response.json({ success: true, data: await this.fileService.uploadMultiFile(request, response) });
    }

    @httpGet("/:fileName")
    public async getFile(request: Request, response: Response, next: NextFunction) {
        await this.fileService.getFile(request.params.fileName, request.params.folder, response);
    }
}
