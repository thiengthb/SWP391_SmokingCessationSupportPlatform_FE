import { api } from "@/lib/axios";
import type { User } from "@/types/user/user";
import type { LoginFormData } from "@/types/auth/login";
import { createContext, useContext, useState } from "react";

export interface Auth {
  isAuthenticated: boolean;
  currentUser: User | null;
  accessToken: string | null;
}

const defaultAuth: Auth = {
  isAuthenticated: false,
  currentUser: null,
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
      const { user, accessToken } = response.data.result;

      console.log("Login successful:", user);

      setAuth({
        isAuthenticated: true,
        currentUser: user,
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
      const response = await api.post("/v1/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      if (response.data.code !== 0) {
        throw new Error(response.data.message || "Logout failed");
      } else {
        console.log("Logout successful");
      }
    } catch (error: any) {
      console.error("Logout error:", error);
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
