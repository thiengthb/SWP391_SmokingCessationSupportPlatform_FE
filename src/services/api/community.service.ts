import type { Account } from "@/types/models/account";
import type { ApiResponse } from "@/types/response";
import type{ ChatMessage } from "@/types/models/chat";
import type{ PaginationParams } from "@/types/pagination";
import { publicApi } from "@/lib/axios";
import { Domains } from "@/constants/domain";

export const fetchOnlineUsers = async () => {
    const response = await publicApi.get<ApiResponse<Account[]>>(`${Domains.ACCOUNT}/online-users`);
    console.log("API res.data:", response.data);
    return response.data.result;
}

export const fetchInitialMessages = async (params: PaginationParams) => {
    const response = await publicApi.get<ApiResponse<ChatMessage[]>>(`${Domains.CHAT}`, { params })
    return response.data.result;
}