import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ForRoles, toForRoles } from "@/utils/tab.util";
import { Paths } from "@/constants/path";

type RequireAuthProps = {
  allowedRoles: ForRoles[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  const currentRole = toForRoles(
    auth.currentAcc?.role,
    auth.currentAcc?.havingSubscription
  );

  const checkAccess = (): boolean => {
    if (allowedRoles?.includes(currentRole)) return true;

    if (
      allowedRoles?.includes(ForRoles.MEMBER) &&
      currentRole === ForRoles.PREMIUM
    )
      return true;

    if (
      allowedRoles?.includes(ForRoles.AUTHENTICATED) &&
      (currentRole === ForRoles.COACH ||
        currentRole === ForRoles.MEMBER ||
        currentRole === ForRoles.PREMIUM ||
        currentRole === ForRoles.ADMIN)
    )
      return true;

    return false;
  };

  return checkAccess() ? (
    <Outlet />
  ) : auth.currentAcc ? (
    <Navigate to={Paths.ACCESS_DENIED} state={{ from: location }} replace />
  ) : (
    <Navigate to={Paths.AUTH.LOGIN} state={{ from: location }} replace />
  );
};

export default RequireAuth;
