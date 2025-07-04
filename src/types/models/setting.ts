export interface Setting {
    theme: Theme;
    language: Language;
    trackingMode: TrackingMode;
    motivationFrequency: MotivationFrequency;
    reportDeadline: string;
}

export const Theme = {
    LIGHT: "LIGHT",
    DARK: "DARK",
    SYSTEM: "SYSTEM",
} as const;

export const Language = {
    EN: "EN",
    VI: "VI",
} as const;

export const TrackingMode = {
    AUTO_COUNT: "AUTO_COUNT",
    DAILY_RECORD: "DAILY_RECORD",
} as const;

export const MotivationFrequency = {
    NEVER: "NEVER",
    EVERY_6_HOURS: "EVERY_6_HOURS",
    EVERY_12_HOURS: "EVERY_12_HOURS",
    DAILY: "DAILY",
    WEEKLY: "WEEKLY",
    MONTHLY: "MONTHLY",
}

export type Theme = (typeof Theme)[keyof typeof Theme];
export type Language = (typeof Language)[keyof typeof Language];
export type TrackingMode = (typeof TrackingMode)[keyof typeof TrackingMode];
export type MotivationFrequency = (typeof MotivationFrequency)[keyof typeof MotivationFrequency];