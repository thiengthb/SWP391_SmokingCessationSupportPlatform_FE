import { z } from "zod";

export const userFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    role: z.enum(["ADMIN", "COACH", "MEMBER"], {
        required_error: "Role is required",
    })
});

export type userFormData = z.infer<typeof userFormSchema>;
export interface userFormResponse {
    code: number;
    message?: string;
    result: {
        id: string;
        username: string;
        email: string,
        phoneNumber: string,
        role: 'ADMIN' | 'COACH' | 'MEMBER';
        status: 'OFFLINE' | 'ONLINE' | 'BANNED';
        createdAt: string;
        updatedAt: string;
    };
}