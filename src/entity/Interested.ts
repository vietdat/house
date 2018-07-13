import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ObjectID } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@Entity("interested")
@ApiModel({
    description: "Interested table",
    name: "Interested"
})
export class Interested {
    @PrimaryGeneratedColumn("uuid")
    @ApiModelProperty({
        description: "Id of version",
        required: true
    })
    public id: string;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    public propId: string;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    public propType: string;

    @Column()
    @ApiModelProperty({
        description: ""
    })
    public userId: string;

    @Column()
    @ApiModelProperty({
        description: ""
    })
    public userType: string;

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
