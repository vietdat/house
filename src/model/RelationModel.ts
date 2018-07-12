import { IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class RelationModel {

    @IsOptional()
    public managerId: string;

    @IsOptional()
    public staffId: string;

    @IsOptional()
    public active: boolean;

    constructor(body: {
        managerId: string, staffId: string, active: boolean
    }) {
        if (body.managerId) {
            this.managerId = body.managerId;
        }

        if (body.staffId) {
            this.staffId = body.staffId;
        }

        if (body.active) {
            this.active = body.active;
        }

    }
}
