import { fetchInitialScores } from "@/services/api/leaderboard.service";
import useSWR from "swr";
import { Domains } from "@/constants/domain";

export const useLeaderboardListSwr = () => {
    const { data, error, isLoading, mutate } = useSWR(
        `${Domains.SCORE}`,
        () => fetchInitialScores(),
    );

    return {
        scores: data || [],
        isLoading,
        error,
        mutate,
    };
}