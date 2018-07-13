import { IsNotEmpty, IsEnum, IsOptional, IsBooleanString } from "class-validator";

enum PropType {
    Property = "property",
    Project = "project"
}

enum UserType {
    User = "user",
    Agent = "agent"
}

export class InterestedModel {

    @IsOptional()
    @IsEnum(PropType)
    public propType: string;

    @IsOptional()
    public propId: string;

    @IsOptional()
    @IsEnum(UserType)
    public userType: string;

    @IsOptional()
    public userId: string;

    @IsOptional()
    @IsBooleanString()
    public active: boolean;

    constructor(body: {
        userId: string, userType: string, propType: string, propId: string, active: boolean
    }) {
        if (body.propType) {
            this.propType = body.propType;
        }

        if (body.propId) {
            this.propId = body.propId;
        }

        if (body.userType) {
            this.userType = body.userType;
        }

        if (body.userId) {
            this.userId = body.userId;
        }

        if (body.active) {
            this.active = body.active;
        }
    }
}
