import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { encryptionService } from "../libs/encryption";

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
    firstName: string;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    lastName: string;
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

    @Column({type: "json", nullable: true})
    @ApiModelProperty({
        description: ""
    })
    facebook: any;

    @Column({type: "json", nullable: true})
    @ApiModelProperty({
        description: ""
    })
    twitter: any;
    @Column({type: "json", nullable: true})
    @ApiModelProperty({
        description: ""
    })
    google: any;

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    createdDate: Date;

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

    @BeforeInsert()
    updateDates() {
        this.createdDate = new Date();
    }
}
