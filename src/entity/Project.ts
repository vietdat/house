import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { encryptionService } from "../libs/encryption";
import * as typeData from "../libs/typeData";

@Entity("project")
@ApiModel({
    description: "Project table",
    name: "Project"
})
export class Project {
    @PrimaryGeneratedColumn("uuid")
    @ApiModelProperty({
        description: "Id of version",
        required: true
    })
    public id: string;

    @Column({ nullable: true, type: "json" })
    @ApiModelProperty({
        description: ""
    })
    public address: JSON;

    @Column({ nullable: true, type: "json" })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public properties: JSON;

    @Column({
        nullable: true
    })
    @ApiModelProperty({
        description: ""
    })
    public postCode: string;

    @Column({
        nullable: true
    })
    @ApiModelProperty({
        description: ""
    })
    public price: number;

    @Column({ nullable: true, default: 0 })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public commission: number;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public promotion: number;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
    })
    public introduce: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public bedroom: number;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
    })
    public bathroom: number;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
    })
    public direction: string;

    @Column({ type: Boolean, default: true })
    @ApiModelProperty({
        description: "",
    })
    public isOwner: boolean;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
    })
    public ownerId: string;

    @Column({ nullable: true, default: true })
    @ApiModelProperty({
        description: ""
    })
    public active: boolean;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public place: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public from: Date;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public to: Date;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public status: Status;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public totalProperty: number;

    @Column({ nullable: true, type: "simple-json" })
    @ApiModelProperty({
        description: ""
    })
    public videos: [JSON];

    @Column({ nullable: true, type: "simple-json" })
    @ApiModelProperty({
        description: ""
    })
    public utilityImages: [JSON];

    @Column({ nullable: true, type: "simple-json" })
    @ApiModelProperty({
        description: ""
    })
    public utilityNames: [JSON];

    @Column({ nullable: true, type: "simple-json" })
    @ApiModelProperty({
        description: ""
    })
    public documents: [JSON];

    @Column({ nullable: true, type: "simple-json" })
    @ApiModelProperty({
        description: ""
    })
    public designImages: [JSON];

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

enum Status {
    New = "new",
    Waitting = "waitting",
    Notapproved = "notapproved",
    Approved = "approved",
    Cancel = "cancel",
    Expired = "expired"
}
