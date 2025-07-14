import { Domains } from "@/constants/domain";
import { fetchInitialMessages, fetchOnlineUsers } from "@/services/api/community.service";
import useSWR from "swr";

export const useOnlineListSwr = () =>{
    const { data, error, isLoading, mutate } = useSWR(
        `${Domains.ACCOUNT}`,
        () => fetchOnlineUsers(),
    );

    return {
        onlineUsers: data || [],
        isLoading,
        error,
        mutate,
    };
}

export const useInitialMessagesSwr = (params: { page: number; limit: number }) => {
    const { data, error, isLoading, mutate } = useSWR(
        [`${Domains.CHAT}`, params],
        () => fetchInitialMessages(params),
    );

    return {
        messages: data || [],
        isLoading,
        error,
        mutate,
    };
}