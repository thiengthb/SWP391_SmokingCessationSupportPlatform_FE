import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { Health, HealthListItem } from "@/types/models/health";
import { createBaseService } from "../base.service";
import type { ApiResponse } from "@/types/response";

const Endpoints = {
    FTND_STATUS: `${Domains.HEALTH}/ftnd-status`,
    MINE: `${Domains.HEALTH}/mine`,
};

const base = createBaseService<Health, HealthListItem>(
    authApi,
    Domains.HEALTH,
);

export const healthService = Object.assign({}, base, {
    
    getHealthFntdStatus: async (): Promise<boolean> => {
        const response = await authApi.get<ApiResponse<boolean>>(Endpoints.FTND_STATUS);
        console.log("FTND status response:", response.data);
        return response.data.result;
    },
    
    getMyHealth: async (): Promise<Health> => {
        const response = await authApi.get<ApiResponse<Health>>(Endpoints.MINE);
        console.log("My health data response:", response.data);
        return response.data.result;
    }
});