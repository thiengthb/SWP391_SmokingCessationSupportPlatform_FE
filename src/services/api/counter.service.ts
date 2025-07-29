import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { Counter } from "@/types/models/counter";
import type { ApiResponse } from "@/types/response";

const Endpoints = {
    START: `${Domains.COUNTER}/start`,
};

export const start = async () => {
    const response = await authApi.put<ApiResponse<Counter>>(Endpoints.START);
    console.log(response.data.message);
    return response.data.result;
}

export const getCounter = async () => {
    const response = await authApi.get<ApiResponse<Counter>>(Domains.COUNTER);
    console.log(response.data.message);
    return response.data.result;
}

export default {
    start,
    getCounter,
};