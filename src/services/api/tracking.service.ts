import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { Statistics } from "@/types/member/statistics";
import type { ApiResponse } from "@/types/response";

export const fetchMemberStatistics = async (): Promise<Statistics> => {
    const response = await authApi.get<ApiResponse<Statistics>>(`${Domains.STATISTICS}/member`);
    return response.data.result;
}
