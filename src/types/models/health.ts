import i18n from "@/lib/i18n";
import { Language } from "../enums/Language";
import { Currency } from "../enums/Currency";

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