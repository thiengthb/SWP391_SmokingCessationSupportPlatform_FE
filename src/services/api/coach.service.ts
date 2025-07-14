import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import type { CoachProfile } from "@/types/models/coach";
import { createBaseService } from "../base.service";

const Endpoints = {
    MY_PROFILE: `${Domains.COACH}/my-profile`,
};

const base = createBaseService<CoachProfile>(
    authApi,
    Domains.COACH,
);

export const coachService = Object.assign({}, base, {
    
    getMyProfile: async (): Promise<CoachProfile> => {
        const response = await authApi.get<CoachProfile>(Endpoints.MY_PROFILE);
        console.log("My coach profile data response:", response.data);
        return response.data;
    },

    updateMyProfile: async (profileData: Partial<CoachProfile>): Promise<CoachProfile> => {
        const response = await authApi.put<CoachProfile>(Endpoints.MY_PROFILE, profileData);
        console.log("Updated coach profile data response:", response.data);
        return response.data;
    }
});