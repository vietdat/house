import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { encryptionService } from "../libs/encryption";

@Entity()
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
    facebook: {
        id: string,
        token: string,
        email: string,
        name: string
    };
    twitter: {
        id: string,
        token: string,
        displayName: string,
        username: string
    };
    google: {
        id: string,
        token: string,
        email: string,
        name: string
    };

    @Column()
    @ApiModelProperty({
        description: "",
        required: true
    })
    createdDate: Date;

    @BeforeInsert()
    hashPassword(): Promise<string> {
        return encryptionService.genSalt().then((salt: string) => {
            console.log(salt);
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
