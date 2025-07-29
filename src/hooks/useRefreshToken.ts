import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/api/auth.service";
import { useCallback } from "react";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = useCallback(async () => {
    const data = await authService.refresh();
    setAuth((prev) => ({
      ...prev,
      currentAcc: data.account,
      accessToken: data.accessToken,
      isAuthenticated: true,
    }));
    return data.accessToken;
  }, [setAuth]);

  return refresh;
}

export default useRefreshToken;
