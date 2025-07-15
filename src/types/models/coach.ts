export interface CoachProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  experienceYears: number; 
  socialLinks?: string[];
  specializations?: string[];
  certifications?: string[];
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export const defaultCoachProfile: CoachProfile = {
  id: "",
  username: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  experienceYears: 0,
  socialLinks: [],
  specializations: [],
  certifications: [],
  avatar: undefined,
  bio: "",
  createdAt: new Date(),
};