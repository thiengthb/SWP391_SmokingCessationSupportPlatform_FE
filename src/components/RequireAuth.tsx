import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/types/models/account";

type RequireAuthProps = {
  allowedRoles: Role[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();
  const role = auth.currentAcc?.role;

  return role && allowedRoles?.includes(role) ? (
    <Outlet />
  ) : auth.currentAcc ? (
    <Navigate to="/access-denied" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
