export interface FTNDQuestion {
  id: number;
  name: string; 
  question: string;
  options: { value: number; label: string }[];
  type?: "radio" | "number" | "text";
  unit?: string;
}

export const ftndQuestions: FTNDQuestion[] = [
  {
    id: 1,
    name: "firstCigaretteTiming",
    question: "How soon after you wake up do you smoke your first cigarette?",
    options: [
      { value: 3, label: "Within 5 minutes" },
      { value: 2, label: "6-30 minutes" },
      { value: 1, label: "31-60 minutes" },
      { value: 0, label: "After 60 minutes" },
    ],
  },
  {
    id: 2,
    name: "smokingForbiddenPlaces",
    question:
      "Do you find it difficult to refrain from smoking in places where it is forbidden?",
    options: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
  },
  {
    id: 3,
    name: "cigaretteGiveUp",
    question: "Which cigarette would you hate most to give up?",
    options: [
      { value: 1, label: "The first one in the morning" },
      { value: 0, label: "Any other" },
    ],
  },
  {
    id: 4,
    name: "smokeFirstHours",
    question:
      "Do you smoke more frequently during the first hours after waking than during the rest of the day?",
    options: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
  },
  {
    id: 5,
    name: "smokeWhenIll",
    question:
      "Do you smoke if you are so ill that you are in bed most of the day?",
    options: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
  },
    {
    id: 6,
    name: "cigarettesPerDay",
    question: "On average, how many cigarettes do you smoke per day?",
    options: [],
    type: "number",
    unit: "cigarettes",
  },
  {
    id: 7,
    name: "cigarettesPerPack",
    question: "How many cigarettes are in a pack that you typically purchase?",
    options: [],
    type: "number",
    unit: "cigarettes per pack",
  },
  {
    id: 8,
    name: "packPrice",
    question: "What is the average price you pay for a pack of cigarettes?",
    options: [],
    type: "number",
    unit: "$",
  },
  {
    id: 9,
    name: "smokeYear",
    question: "How many years have you been smoking?",
    options: [],
    type: "number",
    unit: "years",
  },
  {
    id: 10,
    name: "reasonToQuit",
    question: "What are your main reason for wanting to quit smoking?",
    options: [],
    type: "text",
  }
];

export const ftndLevels = [
  { level: 0, description: "No dependence", advice: "No action needed" },
  { level: 1, description: "Low dependence", advice: "Consider reducing smoking" },
  { level: 2, description: "Moderate dependence", advice: "Seek support to quit" },
  { level: 3, description: "High dependence", advice: "Strongly consider quitting" },
  { level: 4, description: "Very high dependence", advice: "Immediate action recommended" },
];

