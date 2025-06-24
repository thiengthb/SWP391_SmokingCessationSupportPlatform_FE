import { api } from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.post("/v1/auth/refresh-token");
        setAuth((prev) => ({
            ...prev,
            currentUser: response.data.result.user,
            accessToken: response.data.result.accessToken,
        }));
        return response.data.result.accessToken;
    }

  return refresh;
}

export default useRefreshToken;
