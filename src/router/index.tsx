import { createBrowserRouter, Navigate } from "react-router-dom";
import LazyLoad from "@/lazyload";

import App from "../App";
import Layout from "@/components/layout";

const NotFoundPage = LazyLoad("./components/error/NotFound");
const RequireAuth = LazyLoad("./components/RequireAuth");
const AccessDenied = LazyLoad("./components/error/AccessDenied");
const PersistLogin = LazyLoad("./components/PersistLogin");

import { ForRoles } from "@/utils/tab.util";
import { authRoutes } from "./routes/auth.routes";
import { accountRoutes } from "./routes/account.routes";
import { publicRoutes } from "./routes/public.routes";
import { adminRoutes } from "./routes/admin.routes";
import { coachRoutes } from "./routes/coach.routes";
import { memberRoutes, premiumRoutes } from "./routes/member.routes";
import { Paths } from "../constants/path";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: Paths.AUTH.ROOT,
        children: authRoutes,
      },
      { path: Paths.ACCESS_DENIED, element: <AccessDenied /> },
      { path: Paths.NOT_FOUND, element: <NotFoundPage /> },
      {
        element: <PersistLogin />,
        children: [
          { index: true, element: <Navigate to={Paths.HOME} /> },
          { path: Paths.HOME, element: <App /> },
          {
            path: Paths.PUBLIC.ROOT,
            children: publicRoutes,
          },
          {
            path: Paths.ACCOUNT.ROOT,
            element: <RequireAuth allowedRoles={[ForRoles.AUTHENTICATED]} />,
            children: accountRoutes,
          },
          {
            path: Paths.ADMIN.ROOT,
            element: <RequireAuth allowedRoles={[ForRoles.ADMIN]} />,
            children: adminRoutes,
          },
          {
            path: Paths.COACH.ROOT,
            element: <RequireAuth allowedRoles={[ForRoles.COACH]} />,
            children: coachRoutes,
          },
          {
            path: Paths.MEMBER.ROOT,
            element: <RequireAuth allowedRoles={[ForRoles.MEMBER]} />,
            children: memberRoutes,
          },
          {
            path: Paths.PREMIUM.ROOT,
            element: <RequireAuth allowedRoles={[ForRoles.PREMIUM]} />,
            children: premiumRoutes,
          },
        ],
      },
    ],
  },
]);

export default router;
