import { IsNotEmpty, IsEnum, IsOptional } from "class-validator";

enum PropType {
    Property = "property",
    Project = "project"
}

enum UserType {
    User = "user",
    Agent = "agent"
}

export class ReportModel {

    @IsOptional()
    public propId: string;

    @IsOptional()
    @IsEnum(PropType)
    public propType: string;

    @IsOptional()
    public userId: string;

    @IsOptional()
    @IsEnum(UserType)
    public userType: string;

    @IsOptional()
    public message: string;

    @IsOptional()
    public active: string;

    constructor(body: {
        propId: string, propType: string, userId: string, userType: string, type: string, message: string, active: string
    }) {
        if (body.propId) {
            this.propId = body.propId;
        }

        if (body.propType) {
            this.propType = body.propType;
        }

        if (body.userId) {
            this.userId = body.userId;
        }

        if (body.userType) {
            this.userType = body.userType;
        }

        if (body.message) {
            this.message = body.message;
        }

        if (body.active) {
            this.active = body.active;
        }
    }
}
