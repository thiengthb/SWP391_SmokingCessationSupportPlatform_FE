export const Role = {
  ADMIN: "ADMIN",
  COACH: "COACH",
  MEMBER: "MEMBER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];