import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ObjectID } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@Entity("report")
@ApiModel({
    description: "Report table",
    name: "Report"
})
export class Report {
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
    public message: string;

    @Column({ default: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public active: boolean;

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
