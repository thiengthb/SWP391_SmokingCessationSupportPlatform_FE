import type { PhaseStatus } from "../enums/PhaseStatus";
import type { Tip } from "./tip";

export interface Phase {
    id: string;
    planId: string;
    phaseNo: number;
    phaseName: string;
    startDate: Date;
    endDate: Date;
    cigaretteBound: number;
    description: string;
    phaseStatus: PhaseStatus;
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