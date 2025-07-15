import { Domains } from "@/constants/domain";
import { getMyTransactions } from "@/services/api/transaction.service";
import { defaultPaginationParams, type PaginationParams } from "@/types/pagination";
import { useState } from "react";
import useSWR from "swr";

export const useTransactionListSwr = (accountId: string) => {
    const [paginationParams, setPaginationParams] = useState<PaginationParams>(defaultPaginationParams);
    const { data, error, isLoading, mutate } = useSWR(
        accountId ? `${Domains.TRANSACTION}${accountId}` : null,
        () => getMyTransactions(accountId, paginationParams),
    );

    return {
        transactions: data?.content || [],
        pagination: {
            page: data?.page || 0,
            size: data?.size || 10,
            totalElements: data?.totalElements || 0,
            totalPages: data?.totalPages || 0,
        },
        isLoading,
        setPaginationParams,
        error,
        mutate,
    };
}