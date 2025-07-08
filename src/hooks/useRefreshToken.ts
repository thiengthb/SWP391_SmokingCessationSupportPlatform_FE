import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/api/auth.service";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const data = await authService.refresh();
        setAuth((prev) => ({
            ...prev,
            currentAcc: data.account,
            accessToken: data.accessToken,
            isAuthenticated: true,
        }));
        return data.accessToken;
    }

  return refresh;
}

export default useRefreshToken;
