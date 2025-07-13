import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { UserActivityData, UserDistributionResponse, RevenueResponse, PremiumDistribution } from "@/types/models/report";
import type { ApiResponse } from "@/types/response";

export const fetchUserActivityData = async (): Promise<ApiResponse<UserActivityData[]>> => {
    const response = await authApi.get<ApiResponse<UserActivityData[]>>(`${Domains.REPORT}/user-growth`);
    console.log("Fetched user activity data:", response.data);
    return response.data;
}

export const fetchUserDistribution = async (): Promise<UserDistributionResponse> => {
    const response = await authApi.get<ApiResponse<UserDistributionResponse>>(`${Domains.REPORT}/user-distribution`);
    console.log("Fetched user distribution data:", response.data);
    return response.data.result;
}

export const fetchRevenueData = async (): Promise<RevenueResponse> => {
    const response = await authApi.get<ApiResponse<RevenueResponse>>(`${Domains.REPORT}/revenue`);
    console.log("Fetched revenue data:", response.data);
    return response.data.result;
}

export const fetchPremiumDistribution = async (): Promise<PremiumDistribution> => {
    const response = await authApi.get<ApiResponse<PremiumDistribution>>(`${Domains.REPORT}/premium-distribution`);
    console.log("Fetched premium distribution data:", response.data);
    return response.data.result;
}