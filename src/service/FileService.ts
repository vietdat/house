// import { File, MultiFile } from "../model/FileModel";
import * as nodemailer from "nodemailer";
import { Utils } from "../libs/Utils";
import { Constant } from "../all/constant";
import { validate } from "class-validator";
import * as path from "path";
import * as multer from "multer";
import * as async from "async";
import { sprintf } from "sprintf-js";

export class FileService {
    private utils = new Utils();

    public async uploadFile(req, res) {
        return new Promise((resolve) => {
            async.autoInject({
                uploadFile: (done) => {
                    const directory = "./storage/uploads";
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
                                return callback(Error("Only images & PDF are allowed"), false);
                            }
                            callback(null, true);
                        }
                    }).any();

                    let returnData;
                    upload(req, res, (err) => {

                        if (err) {
                            done(Error(err));
                        } else {
                            const element = req.files[0];
                            const ext = path.extname(element.originalname);
                            const result = {
                                type: ext,
                                name: element.filename,
                                url: sprintf(Constant.URL_FILEUPLOAD, "uploads", element.filename)
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
                    throw err;
                }

                resolve(data.uploadFile);
            });
        });
    }
}