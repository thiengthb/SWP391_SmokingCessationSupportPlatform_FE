import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/types/models/account";

export const forRoles = {
  MEMBER: Role.MEMBER,
  ADMIN: Role.ADMIN,
  COACH: Role.COACH,
  GUEST: "GUEST",
  ALL: "ALL",
} as const;

export type forRoles = (typeof forRoles)[keyof typeof forRoles];

export const toForRoles = (role: Role | string | undefined): forRoles => {
  switch (role) {
    case Role.MEMBER:
      return forRoles.MEMBER;
    case Role.ADMIN:
      return forRoles.ADMIN;
    case Role.COACH:
      return forRoles.COACH;
    case "GUEST":
      return forRoles.GUEST;
    default:
      return forRoles.ALL;
  }
}

export const fitlerTabItems = (items: any) => {
    const {auth} = useAuth();

    return items.filter(
        (item: any) =>
        (item.forRoles.includes(toForRoles(auth.currentAcc?.role)) ||
            item.forRoles.includes(forRoles.ALL))
    );
}