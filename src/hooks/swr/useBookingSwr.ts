import { fetchCoachBookings } from "@/services/api/booking.service";
import useSWR from "swr";
import type { Booking } from "@/types/coach/Booking";

export const useCoachBookingsSwr = () => {
    const { data, error, isLoading, mutate } = useSWR<Booking[]>(
        "coach-bookings",
        fetchCoachBookings
    );

    return {
        bookings: data || [],
        isLoading,
        error,
        mutate,
    };
};