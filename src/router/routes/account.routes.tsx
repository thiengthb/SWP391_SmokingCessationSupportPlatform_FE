import LazyLoad from "@/lazyload";
import { Navigate, type RouteObject } from "react-router-dom";
import { Paths } from "../path";

const SettingsPage = LazyLoad("./pages/setting");
const ProfilePage = LazyLoad("./pages/profile/member");
const NotificationPage = LazyLoad("./pages/notification");

export const accountRoutes: RouteObject[] = [
  { index: true, element: <Navigate to={Paths.ACCOUNT.PROFILE} /> },
  {
    path: Paths.ACCOUNT.PROFILE,
    children: [{ path: "", element: <ProfilePage /> }],
  },
  {
    path: Paths.ACCOUNT.SETTING,
    children: [{ path: "", element: <SettingsPage /> }],
  },
  {
    path: Paths.ACCOUNT.NOTIFICATION,
    children: [{ path: "", element: <NotificationPage /> }],
  },
];
