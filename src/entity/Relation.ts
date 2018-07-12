import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ObjectID } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@Entity("relation")
@ApiModel({
    description: "Relation table",
    name: "Relation"
})
export class Relation {
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
    public managerId: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public staffId: string;

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
