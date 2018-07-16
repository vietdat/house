import { IsNotEmpty } from "class-validator";

export class UpdateStaffModel {
    private givenName: string;
    private familyName: string;
    private phoneNumber: string;
    private email: string;
    private birthDate: string;
    private gender: string;
    private language: string;
    private avatar: string;
    private address: object;
    private postCode: string;
    private introduce: string;
    private identifies: any[];
    private company: string;
    private bank: string;
    private temp: any;

    constructor(body: {
        givenName: string, familyName: string, phoneNumber: string, email: string,
        birthDate: string, gender: string, language: string, avatar: string, address: object,
        postCode: string, introduce: string, identifies: any[], company: string, bank: string
    }) {
        body.givenName ? this.givenName = body.givenName : this.temp = null;
        body.familyName ? this.familyName = body.familyName : this.temp = null;
        body.phoneNumber ? this.phoneNumber = body.phoneNumber : this.temp = null;
        body.email ? this.email = body.email : this.temp = null;
        body.birthDate ? this.birthDate = body.birthDate : this.temp = null;
        body.gender ? this.gender = body.gender : this.temp = null;
        body.language ? this.language = body.language : this.temp = null;
        body.avatar ? this.avatar = body.avatar : this.temp = null;
        body.address ? this.address = body.address : this.temp = null;
        body.postCode ? this.postCode = body.postCode : this.temp = null;
        body.introduce ? this.introduce = body.introduce : this.temp = null;
        body.identifies ? this.identifies = body.identifies : this.temp = null;
        body.company ? this.company = body.company : this.temp = null;
        body.bank ? this.bank = body.bank : this.temp = null;
    }
}
