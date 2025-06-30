import i18n from "@/lib/i18n";

export const Currency = {
    VND: "VND",
    USD: "USD",
} as const;

export interface Membership {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: Currency;
    durationDays: number;  
    highlighted: boolean;
    saved?: number;
}

export const defaultMembership: Membership = {
    id: "",
    name: "",
    description: "",
    price: 0,
    currency: i18n.language === "vi" ? Currency.VND : Currency.USD,
    durationDays: 0,
    highlighted: false,
    saved: 0,
};

export type Currency = typeof Currency[keyof typeof Currency];