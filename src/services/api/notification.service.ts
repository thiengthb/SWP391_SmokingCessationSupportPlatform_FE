import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import { createBaseService } from "../base.service";
import type { Notification } from "@/types/models/notification";

const base = createBaseService<Notification>(
    authApi,
    Domains.NOTIFICATION,
);

export const notificationService = Object.assign({}, base, {

    deleteAccountNotification: async (accountId: string): Promise<void> => {
        await authApi.delete(`${Domains.NOTIFICATION}/all/${accountId}`);
    }

});