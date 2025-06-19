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
import ContactPage from "@/pages/contact";
import TeamPage from "@/pages/about/team";
import StoryPage from "@/pages/about/story";
import TestimonialsPage from "@/pages/testimonials";
import AboutPage from "@/pages/about";
import CommunityPage from "@/pages/community";
import LeaderboardPage from "@/pages/leaderboard";
import HallOfFamePage from "@/pages/leaderboard/HallOfFame";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog/[slug]";
import AdminDashboard from "@/pages/dashboard/admin";
import MemberDashboard from "@/pages/dashboard/member";
import CoachDashboard from "@/pages/dashboard/coach";
import RequireAuth from "@/components/RequireAuth";
import { Role } from "@/types/admin/user";
import AccessDenied from "@/components/AccessDenied";
import PersistLogin from "@/components/PersistLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
        ],
      },
      { path: "/access-denied", element: <AccessDenied /> },
      { path: "*", element: <NotFoundPage /> },
      {
        path: "",
        element: <PersistLogin />,
        children: [
          { path: "", element: <App /> },
          { path: "contact", element: <ContactPage /> },
          {
            path: "about",
            element: <AboutPage />,
            children: [
              { path: "team", element: <TeamPage /> },
              { path: "story", element: <StoryPage /> },
            ],
          },
          { path: "test", element: <Test /> },
          { path: "testimonials", element: <TestimonialsPage /> },
          { path: "community", element: <CommunityPage /> },
          {
            path: "leaderboard",
            children: [
              { path: "", element: <LeaderboardPage /> },
              { path: "hall-of-fame", element: <HallOfFamePage /> },
            ],
          },
          {
            path: "blog",
            children: [
              { path: "", element: <BlogPage /> },
              { path: ":slug", element: <BlogPostPage /> },
            ],
          },
          {
            path: "admin",
            element: <RequireAuth allowedRoles={[Role.ADMIN]} />,
            children: [{ path: "dashboard", element: <AdminDashboard /> }],
          },
          {
            path: "coach",
            element: <RequireAuth allowedRoles={[Role.COACH]} />,
            children: [{ path: "dashboard", element: <CoachDashboard /> }],
          },
          {
            path: "member",
            element: <RequireAuth allowedRoles={[Role.MEMBER]} />,
            children: [{ path: "dashboard", element: <MemberDashboard /> }],
          },
          {
            path: "setting",
            element: (
              <RequireAuth
                allowedRoles={[Role.ADMIN, Role.MEMBER, Role.COACH]}
              />
            ),
            children: [{ path: "", element: <SettingsPage /> }],
          },
          {
            path: "profile",
            element: (
              <RequireAuth
                allowedRoles={[Role.ADMIN, Role.MEMBER, Role.COACH]}
              />
            ),
            children: [{ path: "", element: <ProfilePage /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
