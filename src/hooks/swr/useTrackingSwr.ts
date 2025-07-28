import useSWR from "swr";
import { Domains } from "@/constants/domain";
import { useAuth } from "@/contexts/AuthContext";
import { fetchAdminStatistics, fetchCurrentMonthMemberStatistics, fetchMemberStatistics } from "@/services/api/tracking.service";

export const useMemberStatistics = () => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? `${Domains.STATISTICS}/member`: null,
        () => fetchMemberStatistics(),
    );

    return {
        statistics: data || { totalRecords: 0, avgCigarettesPerDay: 0, daysTracked: 0 },
        isLoading,
        error,
        mutate,
    };
}

export const useCurrentMonthMemberStatistics = () => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? `${Domains.STATISTICS}/member/current-month`: null,
        () => fetchCurrentMonthMemberStatistics(),
    );

    return {
        statistics: data || { totalRecords: 0, avgCigarettesPerDay: 0, daysTracked: 0 },
        isLoading,
        error,
        mutate,
    };
}

export const useAdminStatistics = () => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? `${Domains.STATISTICS}/admin`: null,
        () => fetchAdminStatistics(),
    );

    return {
        statistics: data || { totalRevenue: 0, revenueByMembership: [] },
        isLoading,
        error,
        mutate,
    };
}