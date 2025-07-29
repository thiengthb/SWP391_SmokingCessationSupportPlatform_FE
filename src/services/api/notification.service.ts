import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import { createBaseService } from "../base.service";
import type { Notification } from "@/types/models/notification";
import type { PaginationParams, PaginationResponse } from "@/types/pagination";

const base = createBaseService<Notification>(
    authApi,
    Domains.NOTIFICATION,
);

export const notificationService = Object.assign({}, base, {

    getPage: async (params: PaginationParams): Promise<PaginationResponse<Notification>> => {
        console.log("Calling GET /v1/notifications with params:", params);
        const response = await authApi.get(`${Domains.NOTIFICATION}`, { params });
        console.log("Raw response:", response.data);
        return response.data.result;
    },

    deleteAccountNotification: async (accountId: string): Promise<void> => {
        await authApi.delete(`${Domains.NOTIFICATION}/all/${accountId}`);
    }

});