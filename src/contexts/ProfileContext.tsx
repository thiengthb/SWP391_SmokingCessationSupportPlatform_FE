import {
  defaultMemberProfile,
  type MemberProfile,
} from "@/types/models/member";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { defaultCoachProfile, type CoachProfile } from "@/types/models/coach";
import { Role } from "@/types/enums/Role";
import { memberService } from "@/services/api/member.service";
import { coachService } from "@/services/api/coach.service";

export interface ProfileContext {
  memberProfile: MemberProfile;
  setMemberProfile: React.Dispatch<React.SetStateAction<MemberProfile>>;
  handleUpdateMemberProfile: (
    updatedProfile: Partial<MemberProfile>
  ) => Promise<void>;
  coachProfile: CoachProfile;
  setCoachProfile: React.Dispatch<React.SetStateAction<CoachProfile>>;
  handleUpdateCoachProfile: (
    updatedProfile: Partial<CoachProfile>
  ) => Promise<void>;
}

const ProfileContext = createContext<ProfileContext>({} as ProfileContext);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
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
        const data = await memberService.getMyProfile();
        setMemberProfile(data);
      };
      fetchProfileData();
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      setMemberProfile(defaultMemberProfile);
    }
  }, [auth]);

  const handleUpdateMemberProfile = async (
    updatedProfile: Partial<MemberProfile>
  ) => {
    console.log("Updating profile with:", updatedProfile);
    try {
      const data = await memberService.updateMyProfile(updatedProfile);
      setMemberProfile(data);
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
        const data = await coachService.getMyProfile();
        setCoachProfile(data);
      };
      fetchCoachProfile();
    } catch (error) {
      console.error("Failed to fetch coach profile data:", error);
      setCoachProfile(defaultCoachProfile);
    }
  }, [auth]);

  const handleUpdateCoachProfile = async (
    updatedProfile: Partial<CoachProfile>
  ) => {
    console.log("Updating coach profile with:", updatedProfile);
    try {
      const data = await coachService.updateMyProfile(updatedProfile);
      setCoachProfile(data);
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
