export interface HealthCreateRequest {
  cigarettesPerDay: number;
  cigarettesPerPack: number;
  packPrice: number;
  ftndLevel: number;
  reasonToQuit: string;
  smokeYear: number;
}

export interface HealthUpdateRequest {
  cigarettesPerDay?: number;
  cigarettesPerPack?: number;
  packPrice?: number;
  ftndLevel?: number;
  reasonToQuit?: string;
  smokeYear?: number;
}

export const defaultHealthValue: HealthCreateRequest = {
    cigarettesPerDay: 0,  
    cigarettesPerPack: 0,
    packPrice: 0,
    ftndLevel: 0,
    reasonToQuit: "",
    smokeYear: 0,
};