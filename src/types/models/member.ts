export interface MemberProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dob: Date;
  gender: Gender;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface MemberInfoUpdate {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  dob?: Date;
  gender: Gender;
  bio?: string;
}

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

export const defaultMemberProfile: MemberProfile = {
  id: "",
  username: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  gender: Gender.MALE,
  dob: new Date(),
  avatar: undefined,
  bio: "",
  createdAt: new Date(),
}

export type Gender = (typeof Gender)[keyof typeof Gender];