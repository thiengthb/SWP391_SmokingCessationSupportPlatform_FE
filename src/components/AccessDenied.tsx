import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface AccessDeniedProps {
  /** Title for the access denied page */
  title?: string;
  /** Description text */
  description?: string;
  /** Text for back button */
  backText?: string;
  /** Text for login button */
  loginText?: string;
}

export function AccessDenied({
  title = "Access Denied",
  description = "You don't have permission to access this page. Please log in with an account that has the required permissions.",
  backText = "Go Back",
  loginText = "Login",
}: AccessDeniedProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-[calc(100vh-10rem)] w-full flex flex-col items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center text-center max-w-md space-y-6">
        <div className="rounded-full bg-destructive/10 p-6">
          <ShieldX className="h-12 w-12 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={handleGoBack}>
            {backText}
          </Button>
          <Button asChild>
            <Link to="/auth/login">{loginText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
