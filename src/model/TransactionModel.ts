import { IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class TransactionModel {

    @IsOptional()
    public salerId: string;

    @IsOptional()
    public salerType: string;

    @IsOptional()
    public buyerId: string;

    @IsOptional()
    public buyerType: string;

    @IsOptional()
    public saleId: string;

    @IsOptional()
    public saleType: string;

    @IsOptional()
    public propertyId: string;

    @IsOptional()
    public status: string;

    constructor(body: {
        salerId: string, salerType: string, buyerId: string, buyerType: string, saleId: string, saleType: string, propertyId: string, status: string
    }) {
        if (body.salerId) {
            this.salerId = body.salerId;
        }

        if (body.salerType) {
            this.salerType = body.salerType;
        }

        if (body.buyerId) {
            this.buyerId = body.buyerId;
        }

        if (body.saleId) {
            this.saleId = body.saleId;
        }

        if (body.saleType) {
            this.saleType = body.saleType;
        }

        if (body.propertyId) {
            this.propertyId = body.propertyId;
        }

        if (body.status) {
            this.status = body.status;
        }

        if (body.buyerType) {
            this.buyerType = body.buyerType;
        }

    }
}
