import { Domains } from "@/constants/domain";
import { publicApi } from "@/lib/axios";
import type { Auth } from "@/types/models/auth";
import type { ApiResponse } from "@/types/response";
import type { LoginFormData } from "@/types/validations/auth/login";
import type { RegisterFormData } from "@/types/validations/auth/register";

const Endpoints = {
    GOOGLE_LOGIN: `${Domains.AUTH}/google/login`,
    LOGIN: `${Domains.AUTH}/login`,
    LOGOUT: `${Domains.AUTH}/logout`,
    REFRESH: `${Domains.AUTH}/refresh-token`,
    REGISTER: `${Domains.AUTH}/register`,
    FORGOT_PASSWORD: `${Domains.AUTH}/forgot-password`,
    RESET_PASSWORD: `${Domains.AUTH}/reset-password`,
};

export const googleLogin = async (token: string) => {
    const response = await publicApi.post<ApiResponse<Auth>>(Endpoints.GOOGLE_LOGIN, { token });
    console.log(response.data.message);
    return response.data.result;
}

export const login = async (formData: LoginFormData) => {
    const response = await publicApi.post<ApiResponse<Auth>>(Endpoints.LOGIN, formData);
    console.log(response.data.message);
    return response.data.result;
}

export const logout = async () => {
    const response = await publicApi.post<ApiResponse<void>>(Endpoints.LOGOUT);
    console.log(response.data.message);
}

export const refresh = async () => {
    const response = await publicApi.post<ApiResponse<Auth>>(Endpoints.REFRESH);
    console.log(response.data.message);
    return response.data.result;
}

export const register = async (formData: RegisterFormData) => {
    const response = await publicApi.post<ApiResponse<void>>(Endpoints.REGISTER, formData);
    console.log(response.data.message);
};

export const forgotPassword = async (email: string) => {
    const response = await publicApi.post<ApiResponse<void>>(Endpoints.FORGOT_PASSWORD, { email });
    console.log(response.data.message);
}

export const resetPassword = async (token: string, newPassword: string) => {
    const response = await publicApi.post<ApiResponse<void>>(Endpoints.RESET_PASSWORD, { token, newPassword });
    console.log(response.data.message);
};

export default {
    login,
    logout,
    refresh,
    googleLogin,    
    register,
    forgotPassword,
    resetPassword,
};