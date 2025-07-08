import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { BillingTransaction } from "@/types/models/Transaction";
import type { PaginationParams, PaginationResponse } from "@/types/pagination";
import type { ApiResponse } from "@/types/response";


export const getMyTransactions = async (accountId: string, params: PaginationParams) => {
    const response = await authApi.get<ApiResponse<PaginationResponse<BillingTransaction>>>(`${Domains.TRANSACTION}/${accountId}`, { params });
    console.log("Fetched transactions data:", response.data);
    return response.data.result;
}

export default {
    getMyTransactions,
};