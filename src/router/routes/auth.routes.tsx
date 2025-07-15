import LazyLoad from "@/lazyload";
import { Navigate, type RouteObject } from "react-router-dom";
import { Paths } from "../../constants/path";

const LoginPage = LazyLoad("./pages/auth/login");
const RegisterPage = LazyLoad("./pages/auth/register");
const ForgotPasswordPage = LazyLoad("./pages/auth/forgot-password");
const WaitingForApprovalPage = LazyLoad(
  "./pages/verify/WaitingForApprovalPage"
);

export const authRoutes: RouteObject[] = [
  { index: true, element: <Navigate to={Paths.AUTH.LOGIN} /> },
  { path: Paths.AUTH.LOGIN, element: <LoginPage /> },
  { path: Paths.AUTH.REGISTER, element: <RegisterPage /> },
  { path: Paths.AUTH.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  {
    path: Paths.AUTH.WAITING_FOR_APPROVAL,
    element: <WaitingForApprovalPage />,
  },
];
