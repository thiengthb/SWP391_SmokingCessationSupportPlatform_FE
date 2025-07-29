import { Domains } from "@/constants/domain";
import { publicApi } from "@/lib/axios";
import type { ApiResponse } from "@/types/response";
import type { HallOfFame } from "@/types/models/hallOfFame";

export const fetchHallOfFame = async (): Promise<HallOfFame[]> => {
    const response = await publicApi.get<ApiResponse<HallOfFame[]>>(`${Domains.GOAL}/hall-of-fame`);
    console.log("Fetched Hall of Fame data:", response.data);
    return response.data.result;
}