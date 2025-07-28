import type { PlanStatus } from "../enums/PlanStatus";
import type { Phase, PhaseFormData } from "./phase";

export interface PlanFormData {
    planName: string;
    description: string;
    duration: number;
    phases: PhaseFormData[];
}

export interface Tip {
    id: string;
    content: string;
}

export interface Plan {
    id: string;
    accountId: string;
    planName: string;
    successRate: number;
    description: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
    status: PlanStatus;
    progress: number;
    phases: Phase[];
}

export interface PlanListItem {
    id: string;
    planName: string;
    startDate: Date;
    endDate: Date;
    status: PlanStatus;
} 
