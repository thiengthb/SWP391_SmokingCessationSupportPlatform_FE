export const PlanStatus = {
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    PENDING: "PENDING",
    INACTIVE: "INACTIVE",
    CANCELLED: "CANCELLED",
    FAILED: "FAILED",
} as const;

export type PlanStatus = (typeof PlanStatus)[keyof typeof PlanStatus];