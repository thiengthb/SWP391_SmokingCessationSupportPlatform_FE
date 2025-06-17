import { useAuth } from "@/context/AuthProvider";
import { type User } from "@/types/admin/user";
import { type PropsWithChildren } from "react";
import Loading from "./Loading";
import AccessDenied from "./AccessDenied";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User["role"][];
};

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const { accountResponse } = useAuth();

  if (accountResponse === undefined) {
    return <Loading />;
  }

  if (
    accountResponse === null ||
    (allowedRoles && !allowedRoles.includes(accountResponse.role))
  ) {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;
