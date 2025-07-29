export const AccountStatus = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  BANNED: "BANNED",
} as const;


export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];