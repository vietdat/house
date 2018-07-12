import { IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class ReportModel {

    @IsOptional()
    public propId: string;

    @IsOptional()
    public userId: string;

    @IsOptional()
    public type: string;

    @IsOptional()
    public message: string;

    @IsOptional()
    public active: string;

    constructor(body: {
        propId: string, userId: string, type: string, message: string, active: string
    }) {
        if (body.propId) {
            this.propId = body.propId;
        }

        if (body.userId) {
            this.userId = body.userId;
        }

        if (body.type) {
            this.type = body.type;
        }

        if (body.message) {
            this.message = body.message;
        }

        if (body.active) {
            this.active = body.active;
        }
    }
}
