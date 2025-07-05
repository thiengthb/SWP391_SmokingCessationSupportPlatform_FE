import { z } from 'zod';

export const registerFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export interface RegisterResponse {
    code: number;
    message?: string;
    result: {
        isRegistered: boolean;
    };
}