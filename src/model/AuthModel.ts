import { IsNotEmpty } from "class-validator";

export class UpdatePasswordModel {
    private _phoneNumber: string;
    private _oldPasword: string;
    private _newPassword: string;

    constructor(_phoneNumber: string, _oldPassword: string, _newPassword: string) {
        this._newPassword = _newPassword;
        this._phoneNumber = _phoneNumber;
        this._oldPasword = _oldPassword;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ForgotPasswordModel {
    private _phoneNumber: string;

    constructor(_phoneNumber: string) {
        this._phoneNumber = _phoneNumber;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class CheckPhoneExistModel {
    private _phoneNumber: string;

    constructor(_phoneNumber: string) {
        this._phoneNumber = _phoneNumber;
    }
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