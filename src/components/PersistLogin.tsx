import { useAuth } from "@/context/AuthContext";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error("Failed to refresh token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return !persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />;
};

export default PersistLogin;
