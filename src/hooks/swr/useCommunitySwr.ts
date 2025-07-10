import { Domains } from "@/constants/domain";
import { fetchOnlineUsers } from "@/services/api/community.service";
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