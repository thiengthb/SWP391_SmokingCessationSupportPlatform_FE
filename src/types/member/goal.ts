export const CriteriaType = {
  STREAK: "STREAK",
  SMOKE_FREE: "SMOKE_FREE",
  MONEY_SAVED: "MONEY_SAVED",
  PLAN_STREAK: "PLAN_STREAK",
  PLAN_COMPLETE: "PLAN_COMPLETE",
  PHASE_COMPLETE: "PHASE_COMPLETE",
} as const;


export interface Goal {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  criteriaType: CriteriaType;
  criteriaValue: number;
  createdAt: string;
  updatedAt: string;
  goalProgress?: {
    id: string;
    progress: number;
  };
}

export type CriteriaType = (typeof CriteriaType)[keyof typeof CriteriaType];
