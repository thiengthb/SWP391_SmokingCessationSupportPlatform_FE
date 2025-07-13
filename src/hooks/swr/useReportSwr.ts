import { fetchPremiumDistribution } from "@/services/api/report.service";
import useSWR from "swr";
import { Domains } from "@/constants/domain";

export const usePremiumDistributionSwr = () => {
    const { data, error, isLoading, mutate } = useSWR(
        `${Domains.REPORT}/premium-distribution`,
        () => fetchPremiumDistribution(),
    );

    return {
        premiumDistribution: data || { premiumAccounts: 0, nonPremiumAccounts: 0, totalAccounts: 0 },
        isLoading,
        error,
        mutate,
    };
}