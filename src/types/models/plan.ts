export interface PhaseTemplate {
    phaseNo: number;
    phaseName: string;
    duration: number;
    cigarettesBound: number;
    description: string;
    tips: Tip[];
}

export interface PlanTemplate {
    planName: string;
    description: string;
    totalDuration: number;
    phases: PhaseTemplate[];
}

export interface Tip {
    content: string;
}

export interface Phase {
    id: string;
    phaseName: string;
    startDate: Date;
    endDate: Date;
    cigaretteBound: number;
    description: string;
    completed?: boolean;
    tips: Tip[];
}

export interface PhaseFormData {
    phaseName: string;
    startDate: Date; 
    endDate: Date;
    cigaretteBound: number;
    description: string;
    tips: Tip[];
}

export interface PlanFormData {
    planName: string;
    description: string;
    duration: number;
    phases: Phase[];
}

export interface PlanListItem {
    id: string;
    planName: string;
    startDate: Date;
    endDate: Date;
    status: PlanStatus;
} 

export const PlanStatus = {
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    PENDING: "PENDING",
    INACTIVE: "INACTIVE",
    CANCELLED: "CANCELLED",
    FAILED: "FAILED",
} as const;

export type PlanStatus = (typeof PlanStatus)[keyof typeof PlanStatus];
