import { Domains } from "@/constants/domain";
import type { Auth } from "@/contexts/AuthContext";
import { notificationService } from "@/services/api/notification.service";
import { Direction, type PaginationParams } from "@/types/pagination";
import { useState } from "react";
import useSWR from "swr";

export const useNotificationListSwr = (auth: Auth) => {
    const [paginationParams, setPaginationParams] = useState<PaginationParams>({
        page: 0,
        size: 5,
        sortBy: "sentAt",
        direction: Direction.DESC,
    });
    const { data, error, isLoading, mutate } = useSWR(
        auth?.isAuthenticated ? `${Domains.NOTIFICATION}${auth.currentAcc?.id}` : null,
        () => notificationService.getPage(paginationParams),
    );

    return {
        notifications: data?.content || [],
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