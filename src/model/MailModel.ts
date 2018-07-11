import { IsNotEmpty } from "class-validator";

export class Mail {
    @IsNotEmpty()
    public email: string;
    @IsNotEmpty()
    public subject: string;
    @IsNotEmpty()
    public content: string;

    constructor(email: string, subject: string, content: string) {
        this.email = email;
        this.subject = subject;
        this.content = content;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class MultiMail {
    @IsNotEmpty()
    public emails: [string];
    @IsNotEmpty()
    public subject: string;
    @IsNotEmpty()
    public content: string;

    constructor(emails: [string], subject: string, content: string) {
        this.emails = emails;
        this.subject = subject;
        this.content = content;
    }
}