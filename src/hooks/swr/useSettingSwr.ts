import { Domains } from "@/constants/domain";
import { getSetting } from "@/services/api/setting.service";
import useSWR from "swr";

export const useSettingSwr = (accountId: string) => {
    const { data, error, isLoading, mutate } = useSWR(
        accountId ? `${Domains.SETTING}/${accountId}` : null,
        () => getSetting(accountId),
    );

    return {
        setting: data,
        isLoading,
        error,
        mutate,
    };
}