import { api } from "@/lib/axios";
import type { User } from "@/types/admin/user";
import type { LoginFormData } from "@/types/auth/login";
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  accessToken?: string | null;
  accountResponse?: User | null;
  handleLogin: (formData: LoginFormData) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accountResponse, setAccountResponse] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // useEffect(() => {
  //   async function fetchCurrentUser() {
  //     try {
  //       const response = await api.post("/v1/account/me");
  //       const { user } = response.data.result;

  //       setCurrentUser(user);
  //     } catch (error: any) {
  //       setAccessToken(null);
  //       setCurrentUser(null);
  //       console.error("Login error:", error);
  //       throw new Error(error.response?.data?.message || "Login failed");
  //     }
  //   }
  //   fetchCurrentUser();
  // }, []);

  const handleLogin = async (formData: LoginFormData) => {
    try {
      const response = await api.post("/v1/auth/login", formData);
      const { accountResponse, accessToken } = response.data.result;

      setAccessToken(accessToken);
      setAccountResponse(accountResponse);
      setIsAuthenticated(true);
    } catch (error: any) {
      setAccessToken(null);
      setAccountResponse(null);
      setIsAuthenticated(false);
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/v1/auth/logout");
      if (response.data.code !== 0) {
        throw new Error(response.data.message || "Logout failed");
      } else {
        console.log("Logout successful");
      }
    } catch (error: any) {
      console.error("Logout error:", error);
      throw new Error(error.response?.data?.message || "Logout failed");
    } finally {
      setAccessToken(null);
      setAccountResponse(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        accountResponse,
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
