import { z } from 'zod';

export const registerFormSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
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