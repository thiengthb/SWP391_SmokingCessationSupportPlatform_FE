import { Domains } from "@/constants/domain";
import { useAuth, type Auth } from "@/contexts/AuthContext";
import { notificationService } from "@/services/api/notification.service";
import { Direction, type PaginationParams } from "@/types/pagination";
import useSWR from "swr";

export const useNotificationListSwr = (
  auth: Auth,
  page: number,
  size: number
) => {
  const params: PaginationParams = {
    page,
    size,
    sortBy: "sentAt",
    direction: Direction.DESC,
  };
  const {canFetch} = useAuth();
  const key =
    canFetch && auth.currentAcc?.id
      ? `${Domains.NOTIFICATION}-${auth.currentAcc.id}-${page}-${size}`
      : null;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => notificationService.getPage(params)
  );

  return {
    notifications: data?.content || [],
    pagination: {
      page: data?.page ?? 0,
      size: data?.size ?? 10,
      totalElements: data?.totalElements ?? 0,
      totalPages: data?.totalPages ?? 0,
    },
    isLoading,
    error,
    mutate,
  };
};
