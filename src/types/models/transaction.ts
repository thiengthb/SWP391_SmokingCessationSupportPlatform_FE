export interface BillingTransaction {
    id: string;
    accountId: string;
    amount: number;
    currency: Currency;
    status: TransactionStatus;
    method: TransactionMethod;
    createdAt: Date;
}

export const Currency = {
    USD: "USD",
    VND: "VND"
} as const;

export const TransactionStatus = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
} as const;

export const TransactionMethod = {
    CARD: "CARD",
} as const;

export const defaultTransaction: BillingTransaction = {
    id: "",
    accountId: "",
    amount: 0,
    currency: Currency.USD,
    status: TransactionStatus.PENDING,
    method: TransactionMethod.CARD,
    createdAt: new Date(),
};

export type Currency = (typeof Currency)[keyof typeof Currency];
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export type TransactionMethod = (typeof TransactionMethod)[keyof typeof TransactionMethod];