import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { Setting } from "@/types/models/setting";
import type { ApiResponse } from "@/types/response";

export const updateSetting = async (accountId: string, updatedSetting: Partial<Setting>): Promise<Setting> => {
    const response = await authApi.put<ApiResponse<Setting>>(`${Domains.SETTING}/${accountId}`, updatedSetting);
    console.log("Updated setting data:", response.data);
    return response.data.result;
}

export const getSetting = async (accountId: string): Promise<Setting> => {
    const response = await authApi.get<ApiResponse<Setting>>(`${Domains.SETTING}/${accountId}`);
    console.log("Fetched setting data:", response.data);
    return response.data.result;
}

export default {
    updateSetting,
    getSetting
};