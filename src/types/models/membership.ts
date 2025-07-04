import i18n from "@/lib/i18n";
import { Currency } from "./transaction";
import { Language } from "./setting";

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
    currency: i18n.language === Language.VI.toLowerCase() ? Currency.VND : Currency.USD,
    durationDays: 0,
    highlighted: false,
    saved: 0,
};

export interface ProgramFeature {
  title: string;
  description: string;
  free: boolean;
  paid: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}