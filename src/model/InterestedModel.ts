import { IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class InterestedModel {

    @IsOptional()
    public userId: string;

    @IsOptional()
    public propId: string;

    @IsOptional()
    public type: string;

    @IsOptional()
    public active: boolean;

    constructor(body: {
        userId: string, propId: string, type: string, active: boolean
    }) {
        if (body.userId) {
            this.userId = body.userId;
        }

        if (body.propId) {
            this.propId = body.propId;
        }

        if (body.active) {
            this.active = body.active;
        }

        if (body.type) {
            this.type = body.type;
        }

    }
}
