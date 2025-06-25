import { z } from "zod";

export const feedbackSchema = z.object({
  comment: z.string().transform((val) => val || ""),
  rating: z.number().min(1).max(5),
});

export type feedbackFormData = z.infer<typeof feedbackSchema>;

export interface FeedbackResponse {
  code: number;
  message: string;
  result: {
    id: string;
    accountId: string;
    comment: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
}
