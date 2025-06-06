import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Layout from "@/components/layout";
import NotFoundPage from "@/pages/not-found";
import Test from "@/pages/test";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import SettingsPage from "@/pages/setting";
import ProfilePage from "@/pages/profile";
import DashboardPage from "../pages/dashboard";
import ContactPage from "@/pages/contact";
import TeamPage from "@/pages/about/team";
import StoryPage from "@/pages/about/story";
import TestimonialsPage from "@/pages/testimonials";
import AboutPage from "@/pages/about";
import CommunityPage from "@/pages/community";
import LeaderboardPage from "@/pages/leaderboard";
import HallOfFamePage from "@/pages/leaderboard/HallOfFame";
import BlogPage from "@/pages/blog";

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
      { path: "/setting", element: <SettingsPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/about/team",
        element: <TeamPage />,
      },
      {
        path: "/about/story",
        element: <StoryPage />,
      },
      { path: "/test", element: <Test /> },
      { path: "/testimonials", element: <TestimonialsPage /> },
      { path: "/community", element: <CommunityPage /> },
      {
        path: "/leaderboard",
        children: [
          { path: "", element: <LeaderboardPage /> },
          { path: "hall-of-fame", element: <HallOfFamePage /> },
        ],
      },
      {
        path: "/blog",
        children: [{ path: "", element: <BlogPage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
