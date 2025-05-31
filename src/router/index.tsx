import { createBrowserRouter } from "react-router-dom";
import SocialLoginPage from "../pages/SocialLoginPage";
import SignupPage from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import InsurersPage from "../pages/InsurersPage";
import ForCompaniesPage from "../pages/ForCompaniesPage";
import PartnershipPage from "../pages/PartnershipPage";
import DashboardPage from "../pages/DashboardPage";

import App from "../App";
import Layout from "@/components/layout";
import NotFoundPage from "@/pages/not-found";
import Test from "@/pages/test";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ForgotPasswordPage from "@/pages/auth/forgot-password";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
        ],
      },
      { path: "/social-login", element: <SocialLoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/for-insurers", element: <InsurersPage /> },
      { path: "/for-companies", element: <ForCompaniesPage /> },
      { path: "/partnerships", element: <PartnershipPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/test", element: <Test /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
