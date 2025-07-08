import { Button } from "@/components/ui/button";
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
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  registerFormSchema,
  type RegisterFormData,
} from "@/types/validations/auth/register";
import FormInputError from "@/components/FormInputError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import authService from "@/services/api/auth.service";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/auth/waiting-for-approval";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      authService.register(data);

      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Error during registration:", error);

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
    }
  };

  return (
    <div className="w-full my-10 sm:my-16 lg:my-16 2xl:my-40 flex justify-center items-center">
      <Card className="w-[360px] lg:w-[400px] xl:w-[440px] mx-2 pb-10">
        <CardHeader>
          <CardTitle>{t("page.register.title")}</CardTitle>
          <CardDescription>{t("page.register.description")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              <FormInputError field={errors.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                {t("page.register.form.password")}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t("page.register.placeholderConfirm")}
                {...register("password")}
              />
              <FormInputError field={errors.password} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">
                {t("page.register.form.confirmPassword")}
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder={t("page.register.placeholderConfirm")}
                {...register("confirmPassword")}
              />
              <FormInputError field={errors.confirmPassword} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full flex flex-col items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8"
              >
                {isSubmitting
                  ? t("page.register.loading")
                  : t("page.register.signUp")}
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {t("page.register.haveAccount")}
                </span>
                <Button variant="link" className="px-0">
                  <Link
                    to="/auth/login"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {t("page.register.login")}
                  </Link>
                </Button>
              </div>
            </div>
            <GoogleButton />
          </CardFooter>
          <FormInputError field={errors.root} />
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
