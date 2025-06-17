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
import { loginSchema, type LoginFormData } from "@/types/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormInputError from "@/components/FormInputError";
import { useAuth } from "@/context/AuthProvider";
import type { User } from "@/types/admin/user";

const routeRole = (role: User["role"]) => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "COACH":
      return "/coach/dashboard";
    case "MEMBER":
      return "/member/dashboard";
    default:
      return "/";
  }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { accountResponse, accessToken, handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (
    formData: LoginFormData
  ) => {
    handleLogin(formData).then(() => {
      if (accessToken) {
        navigate(routeRole(accountResponse?.role || "MEMBER"));
      }
    });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                disabled={isSubmitting}
                {...register("email")}
              />
              <FormInputError field={errors.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                disabled={isSubmitting}
                {...register("password")}
              />
              <FormInputError field={errors.password} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" disabled={isSubmitting} />
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign In"}
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
