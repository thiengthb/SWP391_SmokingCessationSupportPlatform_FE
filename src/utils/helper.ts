import type { Role } from "@/types/admin/user";
import { jwtDecode, type JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  role: Role;
}

export const roleDecode = (token: string | null): Role | null => {
  try {
    if (!token || token.split(".").length !== 3) {
      console.warn("Invalid token format: missing parts.");
      return null;
    }
    if (token === "null" || token === "undefined") {
        console.warn("Token is null or undefined.");
        return null;
    }
    const decoded: CustomJwtPayload = jwtDecode(token);
    return decoded?.role || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
