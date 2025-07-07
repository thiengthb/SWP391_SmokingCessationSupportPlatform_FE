import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WaitingForApprovalPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Registration Successful
          </CardTitle>
          <CardDescription>Your account is pending approval</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>
            Thank you for registering! Your account has been created and is
            currently awaiting approval from our team.
          </p>
          <p>
            This process typically takes 24-48 hours. We will notify you via
            email once your account has been approved.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-4">
            <p className="text-amber-800 text-sm">
              During this time, you can prepare for your smoking cessation
              journey by exploring our resources and learning about the program.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button asChild className="w-full">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/auth/login">Go to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WaitingForApprovalPage;
