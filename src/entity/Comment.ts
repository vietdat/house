import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ObjectID } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@Entity("comment")
@ApiModel({
    description: "Comment table",
    name: "Comment"
})
export class Comment {
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
    public userType: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public type: string;

    @Column({
        nullable: true
    })
    @ApiModelProperty({
        description: ""
    })
    public userId: string;

    @Column({
        nullable: true
    })
    @ApiModelProperty({
        description: ""
    })
    public comment: string;

    @Column({ default: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public active: boolean;

    @Column({ default: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public rating: number;

    @Column({ nullable: true })
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
