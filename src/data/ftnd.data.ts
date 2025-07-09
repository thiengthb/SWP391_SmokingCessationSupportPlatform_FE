import i18n from "@/lib/i18n";
import { Language } from "@/types/models/setting";
import { Currency } from "@/types/models/transaction";

export interface FTNDQuestion {
  id: number;
  name: string;
  question: string;
  options?: { value: number; label: string }[];
  type?: "radio" | "number" | "text";
  unit?: string;
  isPriceQuestion?: boolean;
}

export const ftndQuestions: FTNDQuestion[] = [
  {
    id: 1,
    name: "firstCigaretteTiming",
    question: "data.ftnd.questions.1.question",
    options: [
      { value: 3, label: "data.ftnd.questions.1.options.3" },
      { value: 2, label: "data.ftnd.questions.1.options.2" },
      { value: 1, label: "data.ftnd.questions.1.options.1" },
      { value: 0, label: "data.ftnd.questions.1.options.0" },
    ],
  },
  {
    id: 2,
    name: "smokingForbiddenPlaces",
    question: "data.ftnd.questions.2.question",
    options: [
      { value: 1, label: "data.ftnd.questions.2.options.1" },
      { value: 0, label: "data.ftnd.questions.2.options.0" },
    ],
  },
  {
    id: 3,
    name: "cigaretteGiveUp",
    question: "data.ftnd.questions.3.question",
    options: [
      { value: 1, label: "data.ftnd.questions.3.options.1" },
      { value: 0, label: "data.ftnd.questions.3.options.0" },
    ],
  },
  {
    id: 4,
    name: "smokeFirstHours",
    question: "data.ftnd.questions.4.question",
    options: [
      { value: 1, label: "data.ftnd.questions.4.options.1" },
      { value: 0, label: "data.ftnd.questions.4.options.0" },
    ],
  },
  {
    id: 5,
    name: "smokeWhenIll",
    question: "data.ftnd.questions.5.question",
    options: [
      { value: 1, label: "data.ftnd.questions.5.options.1" },
      { value: 0, label: "data.ftnd.questions.5.options.0" },
    ],
  },
  {
    id: 6,
    name: "cigarettesPerDay",
    question: "data.ftnd.questions.6.question",
    type: "number",
    unit: "data.ftnd.questions.6.unit",
  },
  {
    id: 7,
    name: "cigarettesPerPack",
    question: "data.ftnd.questions.7.question",
    options: [],
    type: "number",
    unit: "data.ftnd.questions.7.unit",
  },
  {
    id: 8,
    name: "packPrice",
    question: "data.ftnd.questions.8.question",
    type: "number",
    unit: i18n.language === Language.VI ? Currency.VND : Currency.USD,
    isPriceQuestion: true,
  },
  {
    id: 9,
    name: "smokeYear",
    question: "data.ftnd.questions.9.question",
    type: "number",
    unit: "data.ftnd.questions.9.unit",
  },
  {
    id: 10,
    name: "reasonToQuit",
    question: "data.ftnd.questions.10.question",
    type: "text",
  },
];

export const ftndLevels = [
  { level: 0, description: "No dependence", advice: "No action needed" },
  {
    level: 1,
    description: "Low dependence",
    advice: "Consider reducing smoking",
  },
  {
    level: 2,
    description: "Moderate dependence",
    advice: "Seek support to quit",
  },
  {
    level: 3,
    description: "High dependence",
    advice: "Strongly consider quitting",
  },
  {
    level: 4,
    description: "Very high dependence",
    advice: "Immediate action recommended",
  },
];

export const calculateScoreFromCirgettesPerDay = (
  cigarettesPerDay: number
): number => {
  if (cigarettesPerDay <= 10) {
    return 0;
  } else if (cigarettesPerDay <= 20) {
    return 1;
  } else if (cigarettesPerDay <= 30) {
    return 2;
  } else {
    return 3;
  }
};

export const getFtndLevelText = (score: number) => {
  if (score <= 2) return "data.ftnd.levels.low";
  if (score <= 4) return "data.ftnd.levels.moderate";
  if (score <= 6) return "data.ftnd.levels.high";
  return "data.ftnd.levels.very_high";
};

export const getFtndLevelDescription = (score: number) => {
  if (score <= 2) return "data.ftnd.descriptions.low";
  if (score <= 4) return "data.ftnd.descriptions.moderate";
  if (score <= 6) return "data.ftnd.descriptions.high";
  return "data.ftnd.descriptions.very_high";
};
