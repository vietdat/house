import { IsNotEmpty, IsEnum, IsOptional, IsBooleanString, IsNumberString } from "class-validator";

export class WalletModel {
    @IsOptional()
    @IsNumberString()
    public balance: number;

    @IsOptional()
    @IsNumberString()
    public internalMoney: number;

    @IsOptional()
    public incomes: [JSON];

    @IsOptional()
    public referrals: [JSON];

    @IsOptional()
    public paid: [JSON];

    @IsOptional()
    @IsBooleanString()
    public active: boolean;

    constructor(body: {
        balance: number, internalMoney: number, incomes: [JSON], referrals: [JSON], paid: [JSON], active: boolean
    }) {
        if (body.balance) {
            this.balance = body.balance;
        }

        if (body.internalMoney) {
            this.internalMoney = body.internalMoney;
        }

        if (body.incomes) {
            this.incomes = body.incomes;
        }

        if (body.referrals) {
            this.referrals = body.referrals;
        }

        if (body.paid) {
            this.paid = body.paid;
        }

        if (body.active) {
            this.active = body.active;
        }
    }
}
