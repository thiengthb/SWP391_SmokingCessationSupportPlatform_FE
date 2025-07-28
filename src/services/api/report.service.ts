import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { UserGrowthData, UserDistributionResponse, RevenueResponse, PremiumDistribution, CompletionRate } from "@/types/models/report";
import type { ApiResponse } from "@/types/response";

export const fetchUserGrowthData = async ({ from, to }: { from: string, to: string }): Promise<UserGrowthData[]> => {
    const response = await authApi.get<ApiResponse<UserGrowthData[]>>(`${Domains.REPORT}/user-growth`, {
        params: { from, to },
    });
    return response.data.result;
}

export const fetchUserDistribution = async (): Promise<UserDistributionResponse> => {
    const response = await authApi.get<ApiResponse<UserDistributionResponse>>(`${Domains.REPORT}/user-distribution`);
    return response.data.result;
}

export const fetchRevenueData = async ({ from, to }: { from: string, to: string }): Promise<RevenueResponse[]> => {
    const response = await authApi.get<ApiResponse<RevenueResponse[]>>(`${Domains.REPORT}/revenue`, {
        params: { from, to },
    });
    return response.data.result;
}

export const fetchPremiumDistribution = async (): Promise<PremiumDistribution> => {
    const response = await authApi.get<ApiResponse<PremiumDistribution>>(`${Domains.REPORT}/premium-distribution`);
    return response.data.result;
}

export const fetchCompletionRate = async ({ from, to }: { from: string, to: string }): Promise<CompletionRate[]> => {
    const response = await authApi.get<ApiResponse<CompletionRate[]>>(`${Domains.REPORT}/completion`, {
        params: { from, to },
    });
    return response.data.result;
}