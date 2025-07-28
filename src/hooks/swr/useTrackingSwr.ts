import useSWR from "swr";
import { Domains } from "@/constants/domain";
import { useAuth } from "@/contexts/AuthContext";
import { fetchMemberStatistics } from "@/services/api/tracking.service";

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