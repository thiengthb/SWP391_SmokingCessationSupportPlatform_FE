import { api } from "@/lib/axios";
import type { Account } from "@/types/models/account";
import type { LoginFormData } from "@/types/validations/auth/login";
import { createContext, useContext, useState } from "react";
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
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>(defaultAuth);
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") || "true")
  );

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const response = await api.post("/v1/auth/login", formData);
      const { account, accessToken } = response.data.result;

      console.log("Login successful:", account);

      setAuth({
        isAuthenticated: true,
        currentAcc: account,
        accessToken: accessToken,
      });

      toast.success("Đăng nhập thành công", {
        description: "Chào mừng bạn trở lại!",
      });
    } catch (error: any) {
      setAuth(defaultAuth);
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/v1/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
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
