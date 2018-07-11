import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { encryptionService } from "../libs/encryption";
import * as typeData from "../libs/typeData";

@Entity("project")
@ApiModel({
    description: "Project table",
    name: "Project"
})
export class Wallet {
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
    public balance: number;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public internalMoney: number;

    @Column({ nullable: true, type: "simple-json" })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public incomes: [JSON];

    @Column({
        nullable: true, type: "simple-json"
    })
    @ApiModelProperty({
        description: ""
    })
    public referrals: [JSON];

    @Column({
        nullable: true, type: "simple-json"
    })
    @ApiModelProperty({
        description: ""
    })
    public paid: [JSON];

    @Column({
        nullable: true, default: "true"
    })
    @ApiModelProperty({
        description: ""
    })
    public active: boolean;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public createdAt: Date;

    @Column({ type: "simple-array" })
    @ApiModelProperty({
        description: ""
    })
    public updatedAt: Date[];

    @BeforeInsert()
    private addTime() {
        this.createdAt = new Date();
        this.updatedAt = [new Date()];
    }
}

enum Status {
    New = "new",
    Waitting = "waitting",
    Notapproved = "notapproved",
    Approved = "approved",
    Cancel = "cancel",
    Expired = "expired"
}
