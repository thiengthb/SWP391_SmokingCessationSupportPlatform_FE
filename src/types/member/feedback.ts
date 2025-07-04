import { z } from "zod";

export const feedbackSchema = z.object({
  comment: z.string().transform((val) => val || ""),
  rating: z.number().min(1).max(5),
  feedbackType: z.enum(["SYSTEM", "IMPROVEMENT", "MEMBERSHIP","STORY", "OTHERS"], {
        required_error: "Role is required",
    })
});

export type feedbackFormData = z.infer<typeof feedbackSchema>;

export interface FeedbackResponse {
  code: number;
  message: string;
  result: {
    id: string;
    username: string;
    comment: string;
    feedbackType: 'SYSTEM' | 'IMPROVEMENT' | 'MEMBERSHIP' | 'STORY' | 'OTHERS';
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
}

