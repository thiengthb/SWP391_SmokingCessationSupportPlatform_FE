import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SocialLoginPage from "../pages/SocialLoginPage";
import SignupPage from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import InsurersPage from "../pages/InsurersPage";
import ForCompaniesPage from "../pages/ForCompaniesPage";
import PartnershipPage from "../pages/PartnershipPage";
import DashboardPage from "../pages/DashboardPage";
import Test from "@/pages/test";
import LoginPage from "@/pages/auth";
import Layout from "@/components/layout";
import ForgotPasswordPage from "@/pages/auth/forgotPassPage";
import NotFoundPage from "@/pages/not-found";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/auth', element: <LoginPage />, children: [
            { path: 'login'},
            { path: 'register'},
        ]
      },
      { path: '/auth/forgot-password', element: <ForgotPasswordPage /> }, // Redirect to login page
      { path: '/social-login', element: <SocialLoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/for-insurers', element: <InsurersPage /> },
      { path: '/for-companies', element: <ForCompaniesPage /> },
      { path: '/partnerships', element: <PartnershipPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/test', element: <Test /> },
      { path: '*', element: <NotFoundPage/> }
    ]
  }
]);

export default router;