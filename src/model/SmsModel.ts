import { IsNotEmpty } from "class-validator";

export class Sms {
    @IsNotEmpty()
    public phoneNumber: string;
    @IsNotEmpty()
    public content: string;

    constructor(phoneNumber: string, content: string) {
        this.phoneNumber = phoneNumber;
        this.content = content;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class MultiSms {
    @IsNotEmpty()
    public phoneNumbers: [string];
    @IsNotEmpty()
    public content: string;

    constructor(phoneNumbers: [string], content: string) {
        this.phoneNumbers = phoneNumbers;
        this.content = content;
    }
}