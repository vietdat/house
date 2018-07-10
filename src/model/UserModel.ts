import { IsNotEmpty } from "class-validator";

export class UserModel {
    private givenName: string;

    private phoneNumber: string;
}

// tslint:disable-next-line:max-classes-per-file
export class CheckToken {
    @IsNotEmpty()
    private phoneNumber: string;
    @IsNotEmpty()
    private otpToken: string;

    constructor(phoneNumber, otpToken) {
        this.phoneNumber = phoneNumber;
        this.otpToken = otpToken;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ResendToken {
    @IsNotEmpty()
    private phoneNumber: string;

    constructor(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}