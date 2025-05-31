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
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="w-full my-10 sm:my-16 lg:my-16 2xl:my-40 flex justify-center items-center">
      <Card className="w-[360px] lg:w-[400px] xl:w-[440px] mx-2 pb-10">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1234567890" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full flex flex-col items-center">
            <Button className="w-full">Submit</Button>
            <div className="flex items-center gap-2">
              <span className="text-sm">Already have an account?</span>
              <Button variant="link" className="px-0">
                <Link
                  to="/auth/login"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Login
                </Link>
              </Button>
            </div>
          </div>
          <GoogleButton value="Sign up with Google" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
