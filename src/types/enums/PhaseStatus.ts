export const PhaseStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    CANCELLED: "CANCELLED",
    FAILED: "FAILED",
    SUCCESS: "SUCCESS",
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
} as const;

export type PhaseStatus = (typeof PhaseStatus)[keyof typeof PhaseStatus];