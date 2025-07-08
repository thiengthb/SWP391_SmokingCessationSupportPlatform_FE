export const MotivationFrequency = {
    NEVER: "NEVER",
    EVERY_6_HOURS: "EVERY_6_HOURS",
    EVERY_12_HOURS: "EVERY_12_HOURS",
    DAILY: "DAILY",
    WEEKLY: "WEEKLY",
    MONTHLY: "MONTHLY",
}

export type MotivationFrequency = (typeof MotivationFrequency)[keyof typeof MotivationFrequency];