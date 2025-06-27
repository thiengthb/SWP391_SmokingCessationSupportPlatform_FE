import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/types/user/user";

type RequireAuthProps = {
  allowedRoles: Role[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();
  const role = auth.currentUser?.role;

  return role && allowedRoles?.includes(role) ? (
    <Outlet />
  ) : auth.currentUser ? (
    <Navigate to="/access-denied" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
