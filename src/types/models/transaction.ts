import { Currency } from "../enums/Currency";
import { TransactionMethod } from "../enums/TransactionMethod";
import { TransactionStatus } from "../enums/TransactionStatus";

export interface BillingTransaction {
    id: string;
    accountId: string;
    amount: number;
    currency: Currency;
    status: TransactionStatus;
    method: TransactionMethod;
    createdAt: Date;
}

export const defaultTransaction: BillingTransaction = {
    id: "",
    accountId: "",
    amount: 0,
    currency: Currency.USD,
    status: TransactionStatus.PENDING,
    method: TransactionMethod.CARD,
    createdAt: new Date(),
};
