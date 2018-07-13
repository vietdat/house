import { IsNotEmpty } from "class-validator";

export class UpdateAdminModel {
    private givenName: string;
    private familyName: string;
    private phoneNumber: string;
    private email: string;
    private birthDate: string;
    private gender: string;
    private language: string;
    private avatar: string;
    private address: object;
    private temp: any;

    constructor(body: {
        givenName: string, familyName: string, phoneNumber: string, email: string,
        birthDate: string, gender: string, language: string, avatar: string, address: object
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
    }
}
