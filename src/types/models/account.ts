export interface Account {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  role: Role;
  status: AccountStatus;
  havingSubscription: boolean;
  createdAt: string;
  updatedAt: string;
  havingSubscription?: boolean;
}

export const Role = {
  ADMIN: "ADMIN",
  COACH: "COACH",
  MEMBER: "MEMBER",
} as const;

export const AccountStatus = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  BANNED: "BANNED",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];