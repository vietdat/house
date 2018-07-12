import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ObjectID } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@Entity("report")
@ApiModel({
    description: "Transaction table",
    name: "Transaction"
})
export class Transaction {
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
    public salerId: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public salerType: string;

    @Column({
        nullable: true
    })
    @ApiModelProperty({
        description: ""
    })
    public buyerId: string;

    @Column({
        nullable: true
    })
    @ApiModelProperty({
        description: ""
    })
    public buyerType: string;

    @Column({ default: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public propertyId: string;

    @Column({ default: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public status: string;

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
