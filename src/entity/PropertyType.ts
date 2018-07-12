import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ObjectID } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@Entity("propertytype")
@ApiModel({
    description: "Property type table",
    name: "Property type"
})
export class PropertyType {
    @PrimaryGeneratedColumn("uuid")
    @ApiModelProperty({
        description: "Id of version",
        required: true
    })
    public id: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public name: string;

    @Column({ nullable: true, type: "simple-array" })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public category: [string];

    @Column({
        nullable: true
    })
    @ApiModelProperty({
        description: ""
    })
    public active: boolean;

    @ApiModelProperty({
        description: "",
        required: true
    })
    public createdAt: Date;

    @Column("simple-array")
    @ApiModelProperty({
        description: "",
        required: true
    })
    public updatedAt: Date[];

    @BeforeInsert()
    private addTime() {
        this.createdAt = new Date();
        this.updatedAt = [new Date()];
    }

    @BeforeUpdate()
    private updateTime() {
        this.updatedAt.push(new Date());
    }
}
