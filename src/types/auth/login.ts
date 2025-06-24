import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password must be at least 1 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginResponse {
  code: number;
  message?: string;
  result: {
    id: string;
    username: string;
    role: 'ADMIN' | 'COACH' | 'MEMBER';
    accessToken: string;
  };
}