import { z } from "zod";

export const timeTableFormSchema = z.object({
  name: z.string().min(1, "NAME_REQUIRED"),
  description: z.string().min(1, "DESCRIPTION_REQUIRED"),
  startedAt: z.string().regex(/^\d{2}:\d{2}$/, "STARTED_AT_INVALID"),
  endedAt: z.string().regex(/^\d{2}:\d{2}$/, "ENDED_AT_INVALID"),
});

export type timeTableFormData = z.infer<typeof timeTableFormSchema>;

export interface timeTableFormResponse {
  code: number;
  message: string;
  result: {
    id: string;
    coachId: string;
    name?: string;
    description: string;
    startedAt: string;
    endedAt: string;
  };
}
