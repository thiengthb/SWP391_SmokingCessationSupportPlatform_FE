import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleButton from "@/pages/auth/GoogleButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "@/lib/axios";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import type { LoginFormData, LoginResponse } from "@/types/auth/login";
import {
  adminAccount,
  memberAccount,
  coachAccount,
} from "@/utils/mockdata/testaccount";

const testLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}, navigate: ReturnType<typeof useNavigate>) => {
  if (username === adminAccount.email && password === adminAccount.password) {
    navigate("/dashboard/admin");
  } else if (
    username === coachAccount.email &&
    password === coachAccount.password
  ) {
    navigate("/dashboard/member");
  } else if (
    username === memberAccount.email &&
    password === memberAccount.password
  ) {
    navigate("/dashboard/guest");
  } else {
    navigate("/not-found");
  }
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Sending login request with:", formData);
      const { data } = await api.post<LoginResponse>(
        "/api/auth/login",
        formData
      );
      console.log("Login response:", data);

      if (data.code === 0 && data.result.authenticated) {
        login(data.result.token);
        navigate("/dashboard");
      } else {
        const errorMessage = data.result?.message || "Authentication failed";
        setError(errorMessage);
      }
    } catch (err) {
      testLogin(formData, navigate);
      console.error("Login error:", err);
      if (axios.isAxiosError(err)) {
        // Get detailed error message from API response
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Login failed";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full my-10 sm:my-16 lg:my-16 2xl:my-40 flex justify-center items-center">
      <Card className="w-[360px] lg:w-[400px] xl:w-[440px] mx-2 pb-10">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {error && (
              <div className="text-sm text-destructive text-center">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email or Phone</Label>
              <Input
                id="email"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="you@example.com"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={isLoading}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  // checked={formData.remember}
                  // onCheckedChange={(checked) =>
                  //   setFormData({ ...formData, remember: checked as boolean })
                  // }
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="text-sm leading-none">
                  Remember me
                </label>
              </div>
              <Button variant="link" className="px-0 text-sm">
                <Link to="/auth/forgot-password">Forgot password?</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full flex flex-col items-center">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm">Don't have account?</span>
                <Button variant="link" className="px-0">
                  <Link
                    to="/auth/register"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Sign up
                  </Link>
                </Button>
              </div>
            </div>
            <GoogleButton value="Sign in with Google" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
