import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/types/enums/Role";

export const ForRoles = {
  ADMIN: Role.ADMIN,
  COACH: Role.COACH,
  MEMBER: Role.MEMBER,
  PREMIUM: "PREMIUM",
  AUTHENTICATED: "AUTHENTICATED",
  GUEST: "GUEST",
  ALL: "ALL",
} as const;

export type ForRoles = (typeof ForRoles)[keyof typeof ForRoles];

export const toForRoles = (role: Role | string | undefined, havingSubscription:boolean = false): ForRoles => {
  if (role === Role.MEMBER && havingSubscription) 
    return ForRoles.PREMIUM;
  
  switch (role) {
    case Role.ADMIN:
      return ForRoles.ADMIN;
    case Role.COACH:
      return ForRoles.COACH;
    case Role.MEMBER:
      return ForRoles.MEMBER;
    case "PREMIUM":
      return ForRoles.PREMIUM;
    case "AUTHENTICATED":
      return ForRoles.AUTHENTICATED;
    case "GUEST":
      return ForRoles.GUEST;
    default:
      return ForRoles.ALL;
  }
}

export const fitlerTabItems = (items: any) => {
    const {auth} = useAuth();

    return items.filter(
        (item: any) => 
        (item.forRoles?.includes(toForRoles(auth.currentAcc?.role)) ||
            item.forRoles?.includes(ForRoles.ALL))
    );
}