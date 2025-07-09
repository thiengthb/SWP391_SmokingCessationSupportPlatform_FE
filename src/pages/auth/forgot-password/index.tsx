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
import { useTranslate } from "@/hooks/useTranslate";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const { tAuth } = useTranslate();
  return (
    <div className="w-full my-10 sm:my-16 lg:my-16 2xl:my-40 flex justify-center items-center">
      <Card className="w-[360px] lg:w-[400px] xl:w-[440px] mx-2">
        <CardHeader>
          <CardTitle>{tAuth("auth.forgotPassword.title")}</CardTitle>
          <CardDescription>
            {tAuth("auth.forgotPassword.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">
            {tAuth("auth.forgotPassword.buttonSend")}
          </Button>
          <Link
            to="/auth/login"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            {tAuth("auth.forgotPassword.backToLogin")}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
