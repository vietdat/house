// import { File, MultiFile } from "../model/FileModel";
import * as nodemailer from "nodemailer";
import { Utils } from "../libs/Utils";
import { Constant } from "../all/constant";
import { validate } from "class-validator";
import * as path from "path";
import * as multer from "multer";
import * as fs from "fs";
import * as async from "async";
import { sprintf } from "sprintf-js";
import { Message } from "../all/message";
import { StatusCode } from "../all/status-code";

export class FileService {
    private utils = new Utils();

    public async uploadFile(req, res) {
        return new Promise((resolve, reject) => {
            async.autoInject({
                uploadFile: (done) => {
                    const directory = "./storage";
                    const maxSize = 6 * 1000 * 1000;
                    const storage = multer.diskStorage({
                        destination: (_req, file, callback) => {
                            callback(null, directory);
                        },
                        filename: (_req, file, callback) => {
                            callback(null, Date.now() + path.extname(file.originalname));
                        }
                    });

                    const upload = multer({
                        storage,
                        fileFilter: (_req, file, callback) => {
                            const extension = file.mimetype.split("/")[0];
                            const ext = path.extname(file.originalname);
                            if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg" && ext !== ".pdf" && ext !== ".mp4") {
                                reject(Error("Only images & PDF are allowed"));
                            }
                            callback(null, true);
                        }
                    }).any();

                    let returnData;
                    upload(req, res, (err) => {

                        if (err) {
                            reject(Error(err));
                        } else {
                            const element = req.files[0];
                            const ext = path.extname(element.originalname);
                            const result = {
                                type: ext,
                                name: element.filename,
                                url: sprintf(Constant.URL_FILEUPLOAD, element.filename)
                            };
                            returnData = {
                                name: element.filename,
                                url: result.url
                            };

                            done(null, returnData);
                        }
                    });
                }
            }, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data.uploadFile);
            });
        });
    }

    public async uploadMultiFile(req, res) {
        return new Promise((resolve, reject) => {
            async.autoInject({
                uploadFile: (done) => {
                    const directory = "./storage";
                    const maxSize = 6 * 1000 * 1000;
                    const storage = multer.diskStorage({
                        destination: (_req, file, callback) => {
                            callback(null, directory);
                        },
                        filename: (_req, file, callback) => {
                            callback(null, Date.now() + path.extname(file.originalname));
                        }
                    });

                    const upload = multer({
                        storage,
                        fileFilter: (_req, file, callback) => {
                            const extension = file.mimetype.split("/")[0];
                            const ext = path.extname(file.originalname);
                            if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg" && ext !== ".pdf") {
                                reject(Error("Only images & PDF are allowed"));
                            }
                            callback(null, true);
                        }
                    }).any();

                    // tslint:disable-next-line:prefer-const
                    let returnData = [];
                    upload(req, res, (err) => {
                        if (err) {
                            reject(Error(err));
                        } else {
                            req.files.forEach((element) => {
                                const ext = path.extname(element.originalname);
                                const result = {
                                    type: ext,
                                    name: element.filename,
                                    url: sprintf(Constant.URL_FILEUPLOAD, element.filename)
                                };

                                returnData.push(result);
                            });
                            done(null, returnData);
                        }
                    });
                }
            }, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data.uploadFile);
            });
        });
    }

    public async getFile(fileName, folderName, res) {
        const readFile = path.join(__dirname, "../", "../", "storage/", fileName);
        const dir = fs.createReadStream(readFile);
        dir.on("error", (req, next) => {
            throw (this.utils.createError({ statusCode: StatusCode.NOT_FOUND, message: sprintf(Message.NOT_FOUND, "File") }));
        });
        await this.streamFinished(dir.pipe(res));
    }

    private streamFinished(stream: NodeJS.ReadableStream) {
        return new Promise((resolve, reject) => {
            stream.on("end", () => resolve());
            stream.on("error", () => reject());
        });
    }
}