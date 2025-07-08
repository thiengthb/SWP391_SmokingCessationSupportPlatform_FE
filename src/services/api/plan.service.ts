import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import { createBaseService } from "../base.service";
import type { Plan, PlanListItem } from "@/types/models/Plan";
import type { PaginationResponse } from "@/types/pagination";
import type { ApiResponse } from "@/types/response";

const Endpoints = {
    MY_CURRENT: `${Domains.PLAN}/my-current-plan`,
    MY_ALL: `${Domains.PLAN}/my-plans`,
};

const base = createBaseService<Plan, PlanListItem>(
    authApi,
    Domains.PLAN,
);

export const planService = Object.assign({}, base, {
    getMyCurrentPlan: async () => {
        const response = await authApi.get<ApiResponse<Plan>>(Endpoints.MY_CURRENT);
        console.log(response.data.message);
        return response.data;
    },

    getMyAllPlans: async () => {
        const response = await authApi.get<ApiResponse<PaginationResponse<PlanListItem>>>(Endpoints.MY_ALL);
        console.log(response.data.message);
        return response.data;
    },

});