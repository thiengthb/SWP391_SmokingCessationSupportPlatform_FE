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
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="w-full my-10 sm:my-16 lg:my-16 2xl:my-40 flex justify-center items-center">
      <Card className="w-[360px] lg:w-[400px] xl:w-[440px] mx-2 pb-10">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email or Phone</Label>
            <Input id="email" type="text" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
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
            <Button className="w-full">Sign In</Button>
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
      </Card>
    </div>
  );
};

export default LoginPage;
