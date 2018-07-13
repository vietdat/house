import { IsEnum, IsOptional, IsInt, IsBoolean, IsNumber, IsNumberString, IsBooleanString, IsDateString } from "class-validator";

enum Status {
    New = "new",
    Waitting = "waitting",
    Notapproved = "notapproved",
    Approved = "approved",
    Cancel = "cancel",
    Expired = "expired"
}

export class ProjectModel {

    @IsOptional()
    public name: string;

    @IsOptional()
    public address?: JSON;

    @IsOptional()
    public properties: JSON;

    @IsOptional()
    public postCode?: string;

    @IsOptional()
    public area: string;

    @IsOptional()
    @IsNumberString()
    public price: string;

    @IsOptional()
    @IsNumberString()
    public commission: number;

    @IsOptional()
    @IsNumberString()
    public promotion: number;

    @IsOptional()
    public introduce: string;

    @IsOptional()
    @IsNumberString()
    public bedroom: number;

    @IsOptional()
    @IsNumberString()
    public bathroom: number;

    @IsOptional()
    public direction: string;

    @IsOptional()
    @IsBooleanString()
    public isOwner: boolean;

    @IsOptional()
    public ownerId: string;

    @IsOptional()
    @IsBooleanString()
    public active: boolean;

    @IsOptional()
    public place: string;

    @IsOptional()
    @IsDateString()
    public from: Date;

    @IsOptional()
    @IsDateString()
    public to: Date;

    @IsOptional()
    @IsEnum(Status)
    public status: Status;

    @IsOptional()
    @IsNumberString()
    public totalProperty: number;

    @IsOptional()
    public videos: [JSON];

    @IsOptional()
    public images: [JSON];

    @IsOptional()
    public utilityImages: [JSON];

    @IsOptional()
    public utilityNames: [JSON];

    @IsOptional()
    public documents: [JSON];

    @IsOptional()
    public designImages: [JSON];

    constructor(body: {
        name: string, address: JSON, properties: JSON, postCode: string, area: string, price: string, commission: number,
        promotion: number, introduce: string, bedroom: number, bathroom: number, direction: string,
        isOwner: boolean, ownerId: string, active: boolean, place: string, from: Date, to: Date, status: Status,
        totalProperty: number, videos: [JSON], utilityImages: [JSON], documents: [JSON], designImages: [JSON]
    }) {
        if (body.name) {
            this.name = body.name;
        }

        if (body.address) {
            this.address = body.address;
        }

        if (body.properties) {
            this.properties = body.properties;
        }

        if (body.postCode) {
            this.postCode = body.postCode;
        }

        if (body.area) {
            this.area = body.area;
        }

        if (body.price) {
            this.price = body.price;
        }

        if (body.commission) {
            this.commission = body.commission;
        }

        if (body.promotion) {
            this.promotion = body.promotion;
        }

        if (body.introduce) {
            this.introduce = body.introduce;
        }

        if (body.bedroom) {
            this.bedroom = body.bedroom;
        }

        if (body.bathroom) {
            this.bathroom = body.bathroom;
        }

        if (body.direction) {
            this.direction = body.direction;
        }

        if (body.isOwner) {
            this.isOwner = body.isOwner;
        }

        if (body.ownerId) {
            this.ownerId = body.ownerId;
        }

        if (body.active) {
            this.active = body.active;
        }

        if (body.place) {
            this.place = body.place;
        }

        if (body.from) {
            this.from = body.from;
        }

        if (body.to) {
            this.to = body.to;
        }

        if (body.status) {
            this.status = body.status;
        }

        if (body.totalProperty) {
            this.totalProperty = body.totalProperty;
        }

        if (body.utilityImages) {
            this.utilityImages = body.utilityImages;
        }

        if (body.documents) {
            this.documents = body.documents;
        }

        if (body.designImages) {
            this.designImages = body.designImages;
        }
    }
}
