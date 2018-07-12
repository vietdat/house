import { IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class CommentModel {

    @IsOptional()
    public propType: string;

    @IsOptional()
    public propId: string;

    @IsOptional()
    public userType: string;

    @IsOptional()
    public userId: string;

    @IsOptional()
    public comment: string;

    @IsOptional()
    public rating: number;

    @IsOptional()
    public active: boolean;

    constructor(body: {
        propType: string, propId: string, userType: string, userId: string, comment: string, rating: number, active: boolean
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

        if (body.comment) {
            this.comment = body.comment;
        }

        if (body.rating) {
            this.rating = body.rating;
        }

        if (body.active) {
            this.active = body.active;
        }
    }
}
