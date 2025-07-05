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
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loginSchema,
  type LoginFormData,
} from "@/types/validations/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormInputError from "@/components/FormInputError";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const { persist, setPersist, handleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (
    formData: LoginFormData
  ) => {
    await handleLogin(formData)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Error during login:", error);

        if (error.response?.data?.message) {
          setError("root", {
            type: "server",
            message: error.response.data.message,
          });
        } else {
          setError("root", {
            type: "server",
            message: "An unexpected error occurred. Please try again.",
          });
        }
      });
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <div className="w-full my-10 sm:my-16 lg:my-16 2xl:my-40 flex justify-center items-center">
      <Card className="w-[360px] lg:w-[400px] xl:w-[440px] mx-2 pb-10">
        <CardHeader>
          <CardTitle>{t("page.login.title")}</CardTitle>
          <CardDescription>{t("page.login.description")}</CardDescription>
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
              <Label htmlFor="password">{t("page.login.form.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("page.login.placeholderPassword")}
                disabled={isSubmitting}
                {...register("password")}
              />
              <FormInputError field={errors.password} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={persist}
                  onCheckedChange={togglePersist}
                  disabled={isSubmitting}
                />
                <label htmlFor="remember" className="text-sm leading-none">
                  {t("page.login.rememberMe")}
                </label>
              </div>
              <Button variant="link" className="px-0 text-sm">
                <Link to="/auth/forgot-password">
                  {t("page.login.forgotPassword")}
                </Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full flex flex-col items-center">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? t("page.login.signingIn")
                  : t("page.login.signIn")}
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm">{t("page.login.noAccount")}</span>
                <Button variant="link" className="px-0">
                  <Link
                    to="/auth/register"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t("page.login.signUp")}
                  </Link>
                </Button>
              </div>
            </div>
            <GoogleButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
