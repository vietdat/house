import { IsNotEmpty, IsEnum, IsOptional } from "class-validator";

enum Status {
    New = "new",
    Waitting = "waitting",
    Notapproved = "notapproved",
    Approved = "approved",
    Cancel = "cancel",
    Expired = "expired"
}

export class PropertyModel {

    @IsOptional()
    public name: string;

    @IsOptional()
    public address?: JSON;

    @IsOptional()
    public postCode?: string;

    @IsOptional()
    public area: string;

    @IsOptional()
    public price: number;

    @IsOptional()
    public commission: number;

    @IsOptional()
    public promotion: number;

    @IsOptional()
    public introduce: string;

    @IsOptional()
    public bedroom: number;

    @IsOptional()
    public bathroom: number;

    @IsOptional()
    public direction: string;

    @IsOptional()
    public isOwner: boolean;

    @IsOptional()
    public ownerId: string;

    @IsOptional()
    public active: boolean;

    @IsOptional()
    public place: string;

    @IsOptional()
    public from: Date;

    @IsOptional()
    public to: Date;

    @IsOptional()
    @IsEnum(Status)
    public status: Status;

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

    @IsOptional()
    public projectId: string;

    constructor(body: {
        name: string, address: JSON, properties: JSON, postCode: string, area: string, price: number, commission: number,
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
