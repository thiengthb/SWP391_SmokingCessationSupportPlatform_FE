import { z } from "zod";

export const bookingSchema = z.object({
    coachId: z.string().min(1, "COACH_ID_REQUIRED"),
  startedAt: z.string().regex(/^\d{2}:\d{2}$/, "STARTED_AT_INVALID"),
  endedAt: z.string().regex(/^\d{2}:\d{2}$/, "ENDED_AT_INVALID"),
  bookingReason: z.string().min(1, "BOOKING_REASON_REQUIRED"),
});

export type bookingFormData = z.infer<typeof bookingSchema>;

export interface bookingResponse {
  code: number;
  message: string;
  result: {
    id: string;
    memberId: string;
    coachId: string;
    startedAt: string;
    endedAt: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
  };
}

