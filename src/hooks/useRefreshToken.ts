import { api } from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.post("/v1/auth/refresh-token");
        setAuth((prev) => ({
            ...prev,
            currentAcc: response.data.result.account,
            accessToken: response.data.result.accessToken,
            isAuthenticated: true,
        }));
        return response.data.result.accessToken;
    }

  return refresh;
}

export default useRefreshToken;
