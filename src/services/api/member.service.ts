import { Domains } from "@/constants/domain";
import { authApi } from "@/lib/axios";
import { createBaseService } from "../base.service";
import type { MemberProfile } from "@/types/models/member";
import type { ApiResponse } from "@/types/response";

const Endpoints = {
    MY_PROFILE: `${Domains.MEMBER}/my-profile`,
};

const base = createBaseService<MemberProfile>(
    authApi,
    Domains.MEMBER,
);

export const memberService = Object.assign({}, base, {
    
    getMyProfile: async (): Promise<MemberProfile> => {
        const response = await authApi.get<ApiResponse<MemberProfile>>(Endpoints.MY_PROFILE);
        console.log("My member profile data response:", response.data);
        return response.data.result;
    },

    updateMyProfile: async (profileData: Partial<MemberProfile>): Promise<MemberProfile> => {
        const response = await authApi.put<ApiResponse<MemberProfile>>(Endpoints.MY_PROFILE, profileData);
        console.log("Updated member profile data response:", response.data);
        return response.data.result;
    }
});