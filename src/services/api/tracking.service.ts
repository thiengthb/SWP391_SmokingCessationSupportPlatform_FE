import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { AdminStatistics, Statistics } from "@/types/member/statistics";
import type { ApiResponse } from "@/types/response";

export const fetchMemberStatistics = async (): Promise<Statistics> => {
    const response = await authApi.get<ApiResponse<Statistics>>(`${Domains.STATISTICS}/member`);
    return response.data.result;
}

export const fetchCurrentMonthMemberStatistics = async (): Promise<Statistics> => {
    const response = await authApi.get<ApiResponse<Statistics>>(`${Domains.STATISTICS}/member/current-month`);
    return response.data.result;
}

export const fetchAdminStatistics = async (): Promise<AdminStatistics> => {
    const response = await authApi.get<ApiResponse<AdminStatistics>>(`${Domains.STATISTICS}/admin`);
    return response.data.result;
}

export const fetchCurrentMonthAdminStatistics = async (): Promise<AdminStatistics> => {
    const response = await authApi.get<ApiResponse<AdminStatistics>>(`${Domains.STATISTICS}/admin/current-month`);
    return response.data.result;
}
