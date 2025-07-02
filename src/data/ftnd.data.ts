import i18n from "@/lib/i18n";

export interface FTNDQuestion {
  id: number;
  name: string; 
  question: string;
  options?: { value: number; label: string }[];
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
    type: "number",
    unit: i18n.language === "vi" ? "Đồng" : "USD",
  },
  {
    id: 9,
    name: "smokeYear",
    question: "How many years have you been smoking?",
    type: "number",
    unit: "years",
  },
  {
    id: 10,
    name: "reasonToQuit",
    question: "What are your main reason for wanting to quit smoking?",
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

export const calculateScoreFromCirgettesPerDay = (cigarettesPerDay: number): number => {
  if (cigarettesPerDay <= 10) {
    return 0;
  } else if (cigarettesPerDay <= 20) {
    return 1;
  } else if (cigarettesPerDay <= 30) {
    return 2;
  } else {
    return 3;
  }
}

export const getFtndLevelText = (score: number) => {
    if (score <= 2) return "Mức độ phụ thuộc nicotin thấp";
    if (score <= 4) return "Mức độ phụ thuộc nicotin trung bình";
    if (score <= 6) return "Mức độ phụ thuộc nicotin cao";
    return "Mức độ phụ thuộc nicotin rất cao";
  };

export const getFtndLevelDescription = (score: number) => {
  if (score <= 2) {
    return "Bạn có thể cai thuốc lá mà không cần nhiều hỗ trợ về thuốc. Hãy tham khảo các gói cơ bản của chúng tôi.";
  }
  if (score <= 4) {
    return "Bạn có thể gặp một số khó khăn khi cai thuốc lá. Chúng tôi khuyến nghị gói hỗ trợ tiêu chuẩn.";
  }
  if (score <= 6) {
    return "Bạn cần sự hỗ trợ đáng kể để cai thuốc lá. Gói hỗ trợ cao cấp sẽ phù hợp với bạn.";
  }
  return "Bạn có mức độ phụ thuộc cao vào nicotin và cần hỗ trợ toàn diện. Chúng tôi khuyến nghị gói hỗ trợ toàn diện kết hợp với tư vấn chuyên gia.";
};

