import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { encryptionService } from "../libs/encryption";
import * as typeData from "../libs/typeData";

@Entity('user')
@ApiModel({
    description: "User table",
    name: "User"
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    @ApiModelProperty({
        description: "Id of version",
        required: true
    })
    id: number;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    familyName: string;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    givenName: string;

    @Column({
        unique: true
    })
    @ApiModelProperty({
        description: "",
        required: true
    })
    phoneNumber: string;

    @Column({
        unique: true
    })
    @ApiModelProperty({
        description: "",
        required: true
    })
    email: string;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    password: string;

    @Column()
    @ApiModelProperty({
        description: "",
    })
    birthDate: string;

    @Column()
    @ApiModelProperty({
        description: "",
    })
    gender: string;

    @Column()
    @ApiModelProperty({
        description: "",
    })
    language: string;

    @Column()
    @ApiModelProperty({
        description: "",
    })
    referralCode: string;

    @Column()
    @ApiModelProperty({
        description: "",
    })
    reference: string;

    @Column()
    @ApiModelProperty({
        description: "",
    })
    active: boolean;

    @Column()
    @ApiModelProperty({
        description: "",
    })
    avatar: string;

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: "",
    })
    address: any;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    postCode: string;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    introduce: string;

    @Column("simple-array")
    @ApiModelProperty({
        description: "",
        required: true
    })
    identifies: string[];

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: ""
    })
    facebook: typeData.IFacebook;

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: ""
    })
    twitter: typeData.ITwitter;

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: ""
    })
    google: typeData.IGoogle;

    @Column()
    @ApiModelProperty({
        description: ""
    })
    company: string;

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: ""
    })
    bank: any;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    createdAt: Date;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        return encryptionService.genSalt().then((salt: string) => {
            return encryptionService
                .hash(this.password, salt)
                .then(
                    (hash: string) => this.password = hash
                )
        });
    }

    @BeforeUpdate()
    async updatePassword() {
        if (this.password) {
            return encryptionService.genSalt().then((salt: string) => {
                return encryptionService
                    .hash(this.password, salt)
                    .then(
                        (hash: string) => this.password = hash
                    )
            });
        }
    }

    @BeforeInsert()
    addTime() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    updateTime() {
        this.updatedAt = new Date();
    }
}
