import { Domains } from "@/constants/domain";
import { publicApi } from "@/lib/axios";
import type { Booking } from "@/types/coach/Booking";
import type { ApiResponse } from "@/types/response";

export const fetchMemberBookings = async (page: number, size: number): Promise<Booking[]> => {
  const response = await publicApi.get<ApiResponse<{ content: Booking[]; totalElements: number }>>(
    `${Domains.BOOKINGS}/member-booking?page=${page}&size=${size}&direction=ASC&sortBy=startedAt`
  );
  return response.data.result.content || [];
}

export const fetchCoachBookings = async (): Promise<Booking[]> => {
  const response = await publicApi.get<ApiResponse<{ content: Booking[]; totalElements: number }>>(
    `${Domains.BOOKINGS}/coach-booking`
  );
    console.log("API res.data:", response.data);
  return response.data.result.content || [];
}