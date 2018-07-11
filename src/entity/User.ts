import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, BaseEntity } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { encryptionService } from "../libs/encryption";
import * as typeData from "../libs/typeData";

@Entity("user")
@ApiModel({
    description: "User table",
    name: "user"
})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @ApiModelProperty({
        description: "Id of version",
        required: true
    })
    public id: number;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public familyName: string;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    public givenName: string;

    @Column({
        unique: true, nullable: true
    })
    @ApiModelProperty({
        description: "",
        required: true
    })
    public phoneNumber: string;

    @Column({
        unique: true, nullable: true
    })
    @ApiModelProperty({
        description: ""
    })
    public email: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public otpToken: string;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    public password: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public birthDate: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
    })
    public gender: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public language: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
    })
    public referralCode: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
    })
    public reference: string;

    @Column({ type: Boolean, default: true })
    @ApiModelProperty({
        description: "",
    })
    public active: boolean;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: "",
    })
    public avatar: string;

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: "",
    })
    public address: any;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public postCode: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public introduce: string;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public walletId: string;

    @Column({ type: "simple-array", nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public identifies: string[];

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public facebook: typeData.IFacebook;

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public twitter: typeData.ITwitter;

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public google: typeData.IGoogle;

    @Column({ nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public company: string;

    @Column({ type: "json", nullable: true })
    @ApiModelProperty({
        description: ""
    })
    public bank: any;

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

    @BeforeUpdate()
    public async updatePassword() {
        if (this.password) {
            return encryptionService.genSalt().then((salt: string) => {
                return encryptionService
                    .hash(this.password, salt)
                    .then(
                        (hash: string) => this.password = hash
                    );
            });
        }
    }

    @BeforeInsert()
    private async hashPassword() {
        return encryptionService.genSalt().then((salt: string) => {
            return encryptionService
                .hash(this.password, salt)
                .then(
                    (hash: string) => this.password = hash
                );
        });
    }

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
