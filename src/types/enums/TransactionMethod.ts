export const TransactionMethod = {
    CARD: "CARD",
} as const;

export type TransactionMethod = (typeof TransactionMethod)[keyof typeof TransactionMethod];
