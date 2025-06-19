import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types/admin/user";
import { roleDecode } from "@/utils/helper";

type RequireAuthProps = {
  allowedRoles: Role[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  const role = roleDecode(auth?.accessToken || "");

  return role && allowedRoles?.includes(role) ? (
    <Outlet />
  ) : auth.currentUser ? (
    <Navigate to="/access-denied" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
