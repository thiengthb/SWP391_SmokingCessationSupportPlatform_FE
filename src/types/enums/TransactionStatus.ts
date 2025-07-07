export const TransactionStatus = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
} as const;

export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
