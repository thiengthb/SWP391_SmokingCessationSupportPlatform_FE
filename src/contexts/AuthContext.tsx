import useRefreshToken from "@/hooks/useRefreshToken";
import { setUpAuthInterceptors } from "@/lib/axios";
import { login, logout, refresh as refreshService } from "@/services/api/auth.service";
import type { Account } from "@/types/models/account";
import type { LoginFormData } from "@/types/validations/auth/login";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface Auth {
  isAuthenticated: boolean;
  currentAcc: Account | null;
  accessToken: string | null;
}

export const defaultAuth: Auth = {
  isAuthenticated: false,
  currentAcc: null,
  accessToken: null,
};

export interface AuthContext {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (formData: LoginFormData) => Promise<void>;
  handleLogout: () => Promise<void>;
  canFetch: boolean;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const refresh = useRefreshToken();

  const [auth, setAuth] = useState<Auth>(defaultAuth);
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") || "true")
  );
  const [canFetch, setCanFetch] = useState(false);

  useEffect(() => {
    const eject = setUpAuthInterceptors(
      () => auth.accessToken || null,
      refresh
    );
    return () => eject();
  }, [auth.accessToken, refresh]);

  useEffect(() => {
    const initAuth = async () => {
      if (!persist) {
        setCanFetch(true);
        return;
      }

      try {
        const data = await refreshService();
        setAuth({
          accessToken: data.accessToken,
          currentAcc: data.account,
          isAuthenticated: true,
        });
      } catch (err) {
        console.warn("Token refresh failed on app load");
        setAuth(defaultAuth);
      } finally {
        setCanFetch(true);
      }
    };

    initAuth();
  }, [persist]);

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const data = await login(formData);
      const { account, accessToken } = data;

      console.log("Login successful:", account);
      toast.success("Đăng nhập thành công", {
        description: "Chào mừng bạn trở lại!",
      });

      setAuth({
        isAuthenticated: true,
        currentAcc: account,
        accessToken: accessToken,
      });
    } catch (error: any) {
      setAuth(defaultAuth);
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      console.log("Logout successful");
      toast.success("Đăng xuất thành công", {
        description: "Bạn đã đăng xuất thành công",
      });

      setAuth(defaultAuth);
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error("Đăng xuất thất bại", {
        description:
          error.response?.data?.message || "Đã xảy ra lỗi khi đăng xuất",
      });
      throw new Error(error.response?.data?.message || "Logout failed");
    } finally {
      setAuth(defaultAuth);
      console.log("Auth state reset after logout");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        handleLogin,
        handleLogout,
        canFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
