import { IsNotEmpty } from "class-validator";

export class Sms {
    @IsNotEmpty()
    public phoneNumber: string;
    @IsNotEmpty()
    public content: string;

    constructor(phoneNumber, content) {
        this.phoneNumber = phoneNumber;
        this.content = content;
    }
}