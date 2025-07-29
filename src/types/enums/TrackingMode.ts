export const TrackingMode = {
    AUTO_COUNT: "AUTO_COUNT",
    DAILY_RECORD: "DAILY_RECORD",
} as const;

export type TrackingMode = (typeof TrackingMode)[keyof typeof TrackingMode];