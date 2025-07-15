import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { SmokingRecord } from "@/types/models/Record";
import { createBaseService } from "../base.service";
import type { ApiResponse } from "@/types/response";
import type { PaginationResponse } from "@/types/pagination";

const Endpoints = {
    MY_RECORDs: `${Domains.RECORD}/my-records`,
    RECORD_BY_ACCOUNT: (accountId: string) => `${Endpoints.MY_RECORDs}/account/${accountId}`
};

const base = createBaseService<SmokingRecord>(
    authApi,
    Domains.RECORD,
);

export const recordService = Object.assign({}, base, {
    getMyRecord: async (date: Date): Promise<PaginationResponse<SmokingRecord>> => {
        const response = await authApi.get<ApiResponse<PaginationResponse<SmokingRecord>>>(
            `${Domains.RECORD}/date/${date.toISOString()}`
        );
        console.log(response.data.message);
        return response.data.result;
    },

    getRecordsByAccountId: async (accountId: string): Promise<PaginationResponse<SmokingRecord>> => {
        const response = await authApi.get<ApiResponse<PaginationResponse<SmokingRecord>>>(
            Endpoints.RECORD_BY_ACCOUNT(accountId)
        );
        console.log(response.data.message);
        return response.data.result;
    }
});