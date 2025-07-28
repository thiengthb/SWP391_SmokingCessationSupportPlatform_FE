import { Domains } from "@/constants/domain";
import { publicApi } from "@/lib/axios";
import type { ScoreResponse } from "@/types/models/leaderboard"
import type { ApiResponse } from "@/types/response";

export const fetchInitialScores = async () => {
    const response = await publicApi.get<ApiResponse<ScoreResponse[]>>(`${Domains.SCORE}`);
    console.log("API res.data:", response.data);
    return response.data.result;
};

export default {
    fetchInitialScores,
};