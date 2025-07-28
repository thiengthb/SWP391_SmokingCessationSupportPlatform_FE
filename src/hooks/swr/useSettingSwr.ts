import { Domains } from "@/constants/domain";
import { useAuth } from "@/contexts/AuthContext";
import { getSetting } from "@/services/api/setting.service";
import useSWR from "swr";

export const useSettingSwr = (accountId: string) => {
    const { canFetch } = useAuth();
    const { data, error, isLoading, mutate } = useSWR(
        canFetch ? accountId ? `${Domains.SETTING}/${accountId}` : null : null,
        () => getSetting(accountId),
    );

    return {
        setting: data,
        isLoading,
        error,
        mutate,
    };
}