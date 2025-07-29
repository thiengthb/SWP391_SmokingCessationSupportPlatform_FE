import { fetchHallOfFame } from "@/services/api/hallOfFame.service";    
import useSWR from "swr";
import { Domains } from "@/constants/domain";
import { useAuth } from "@/contexts/AuthContext";

export const useHallOfFameSwr = () => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? `${Domains.GOAL}/hall-of-fame` : null,
        () => fetchHallOfFame(),
    );

    return {
        hallOfFame: data || [],
        isLoading,
        error,
        mutate,
    };
};