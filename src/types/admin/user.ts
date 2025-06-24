export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
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