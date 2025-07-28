import { fetchCompletionRate, fetchPremiumDistribution, fetchRevenueData, fetchUserDistribution, fetchUserGrowthData } from "@/services/api/report.service";
import useSWR from "swr";
import { Domains } from "@/constants/domain";
import { useAuth } from "@/contexts/AuthContext";

export const usePremiumDistributionSwr = () => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? `${Domains.REPORT}/premium-distribution`: null,
        () => fetchPremiumDistribution(),
    );

    return {
        premiumDistribution: data || { premiumAccounts: 0, nonPremiumAccounts: 0, totalAccounts: 0 },
        isLoading,
        error,
        mutate,
    };
}

export const useRevenueSwr = (from: string, to: string) => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? `${Domains.REPORT}-revenue-${from}-${to}` : null,
        () => fetchRevenueData({ from, to }),
    );

    return {
        revenue: data || [],
        isLoading,
        error,
        mutate,
    };
}

export const useUserGrowthSwr = (from: string, to: string) => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? `${Domains.REPORT}/user-growth-${from}-${to}` : null,
        () => fetchUserGrowthData({ from, to }),
    );

    return {
        userGrowth: data || [],
        isLoading,
        error,
        mutate,
    };
}

export const useUserDistributionSwr = () => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? `${Domains.REPORT}/user-distribution` : null,
        () => fetchUserDistribution(),
    );

    return {
        userDistribution: data || { totalAccounts: 0, onlineAccounts: 0, offlineAccounts: 0, inactiveAccounts: 0 },
        isLoading,
        error,
        mutate,
    };
}   

export const useCompletionRateSwr = (from: string, to: string) => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? `${Domains.REPORT}/completion-${from}-${to}` : null,
        () => fetchCompletionRate({ from, to }),
    );

    return {
        completionRate: data || [],
        isLoading,
        error,
        mutate,
    };
}