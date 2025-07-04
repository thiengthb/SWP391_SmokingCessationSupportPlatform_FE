import useApi from "@/hooks/useApi";
import {
  defaultMemberProfile,
  type MemberInfoUpdate,
  type MemberProfile,
} from "@/types/models/member";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  defaultCoachProfile,
  type CoachInfoUpdate,
  type CoachProfile,
} from "@/types/models/coach";
import { Role } from "@/types/models/account";

export interface ProfileContext {
  memberProfile: MemberProfile;
  setMemberProfile: React.Dispatch<React.SetStateAction<MemberProfile>>;
  handleUpdateMemberProfile: (
    updatedProfile: MemberInfoUpdate
  ) => Promise<void>;
  coachProfile: CoachProfile;
  setCoachProfile: React.Dispatch<React.SetStateAction<CoachProfile>>;
  handleUpdateCoachProfile: (updatedProfile: CoachInfoUpdate) => Promise<void>;
}

const ProfileContext = createContext<ProfileContext>({} as ProfileContext);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const apiWithInterceptor = useApi();
  const { auth } = useAuth();
  const [memberProfile, setMemberProfile] =
    useState<MemberProfile>(defaultMemberProfile);
  const [coachProfile, setCoachProfile] =
    useState<CoachProfile>(defaultCoachProfile);

  useEffect(() => {
    if (
      !auth.isAuthenticated ||
      !auth.currentAcc ||
      auth.currentAcc.role !== Role.MEMBER
    ) {
      console.warn("User is not authenticated, skipping profile fetch.");
      setMemberProfile(defaultMemberProfile);
      return;
    }
    try {
      const fetchProfileData = async () => {
        const response = await apiWithInterceptor.get("/v1/members/my-profile");
        console.log("Fetched profile data:", response.data.result);
        setMemberProfile(response.data.result);
      };
      fetchProfileData();
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      setMemberProfile(defaultMemberProfile);
    }
  }, [auth]);

  const handleUpdateMemberProfile = async (
    updatedProfile: MemberInfoUpdate
  ) => {
    console.log("Updating profile with:", updatedProfile);
    try {
      const response = await apiWithInterceptor.put(
        "/v1/members/my-profile",
        updatedProfile
      );
      console.log("Updated profile data:", response.data.result);
      setMemberProfile(response.data.result);
    } catch (error) {
      console.error("Failed to update profile data:", error);
      throw new Error("Failed to update profile data");
    }
  };

  useEffect(() => {
    if (
      !auth.isAuthenticated ||
      !auth.currentAcc ||
      auth.currentAcc.role !== Role.COACH
    ) {
      console.warn("User is not authenticated or not a coach, skipping fetch.");
      setCoachProfile(defaultCoachProfile);
      return;
    }
    try {
      const fetchCoachProfile = async () => {
        const response = await apiWithInterceptor.get(`/v1/coaches/my-profile`);
        console.log("Fetched coach profile data:", response.data.result);
        setCoachProfile(response.data.result);
      };
      fetchCoachProfile();
    } catch (error) {
      console.error("Failed to fetch coach profile data:", error);
      setCoachProfile(defaultCoachProfile);
    }
  }, [auth]);

  const handleUpdateCoachProfile = async (updatedProfile: CoachInfoUpdate) => {
    console.log("Updating coach profile with:", updatedProfile);
    try {
      const response = await apiWithInterceptor.put(
        "/v1/coaches/my-profile",
        updatedProfile
      );
      console.log("Updated coach profile data:", response.data.result);
      setCoachProfile(response.data.result);
    } catch (error) {
      console.error("Failed to update coach profile data:", error);
      throw new Error("Failed to update coach profile data");
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        memberProfile,
        setMemberProfile,
        handleUpdateMemberProfile,
        coachProfile,
        setCoachProfile,
        handleUpdateCoachProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
