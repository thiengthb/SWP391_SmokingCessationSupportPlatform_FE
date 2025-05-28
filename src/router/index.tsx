import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import SocialLoginPage from "../pages/SocialLoginPage";
import SignupPage from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <LoginPage /> },
    {path: '/social-login', element:<SocialLoginPage />},
    { path: '/signup', element: <SignupPage /> },
    {path: '/signin', element: <SignIn />},
    {path: '/forgot-password', element: <ForgotPassword />},
    { path: '*', element: <NotFoundPage /> }
    
]);

export default router;