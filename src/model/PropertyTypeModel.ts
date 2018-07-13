import { IsNotEmpty, IsEnum, IsOptional, IsBooleanString, IsArray } from "class-validator";

export class PropertyTypeModel {

    @IsOptional()
    public name: string;

    @IsOptional()
    public category: [string];

    @IsOptional()
    @IsBooleanString()
    public active: boolean;

    constructor(body: {
        name: string, category: [string], active: boolean
    }) {
        if (body.name) {
            this.name = body.name;
        }

        if (body.category) {
            this.category = body.category;
        }

        if (body.active) {
            this.active = body.active;
        }
    }
}
