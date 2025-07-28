import { z } from "zod";

export const goalFormSchema = z.object({
  name: z.string().min(1, "NAME_REQUIRED"),
  description: z.string().min(1, "DESCRIPTION_REQUIRED"),
  iconUrl: z.string().min(1, "ICON_URL_REQUIRED"),
  criteriaType: z.enum(
    [
      "STREAK",
      "SMOKE_FREE",
      "MONEY_SAVED",
      "PLAN_STREAK",
      "PLAN_COMPLETE",
      "PHASE_COMPLETE",
    ],
    {
      required_error: "CRITERIA_TYPE_REQUIRED",
    }
  ),
  criteriaValue: z
    .number({ invalid_type_error: "CRITERIA_VALUE_REQUIRED" })
    .min(0, "CRITERIA_VALUE_INVALID"),
  goalDifficulty: z.enum(["NORMAL", "BADGE", "MEDAL" ]).default("NORMAL").optional(),
}).refine((data) => true);

export type goalFormData = z.infer<typeof goalFormSchema>;

export interface goalFormResponse {
    code: number;
    message: string;
    result: {
        id: string;
        name: string;
        description: string;
        iconUrl: string;
        criteriaType: 'STREAK' | 'SMOKE_FREE' | 'MONEY_SAVED' | 'PLAN_STREAK' | 'PLAN_COMPLETE' | 'PHASE_COMPLETE'
        goalDifficulty: 'NORMAL' | 'BADGE' | 'MEDAL';
        createdAt: string;
        updatedAt: string;
        goalProgress: {
            id: string;
            progress: number;
        }
    }
}
