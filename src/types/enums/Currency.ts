export const Currency = {
    USD: "USD",
    VND: "VND"
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];