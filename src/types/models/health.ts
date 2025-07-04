import i18n from "@/lib/i18n";
import { Currency } from "./transaction";
import { Language } from "./setting";

export interface Health {
  id: string;
  ftndAnswers: string;
  ftndLevel: number;
  cigarettesPerDay: number;
  cigarettesPerPack: number;
  packPrice: number;
  currency: Currency;
  reasonToQuit: string;
  smokeYear: number;
  createdAt: Date;
}

export interface HealthInfoUpdate {
  ftndAnswers?: string;
  ftndLevel?: number;
  cigarettesPerDay?: number;
  cigarettesPerPack?: number;
  packPrice?: number;
  currency?: Currency;
  reasonToQuit?: string;
  smokeYear?: number;
}

export interface HealthListItem {
  id: string;
  ftndLevel: number;
  cigarettesPerDay: number;
  cigarettesPerPack: number;
  packPrice: number;
  currency: Currency; 
  createdAt: Date;
} 

export const defaultHealthValue: Health = {
    id: "",
    ftndAnswers: "{}",
    ftndLevel: 0,
    cigarettesPerDay: 0,  
    cigarettesPerPack: 0,
    packPrice: 0,
    currency: i18n.language === Language.VI.toLowerCase() ? Currency.VND : Currency.USD,
    reasonToQuit: "",
    smokeYear: 0,
    createdAt: new Date(),
};