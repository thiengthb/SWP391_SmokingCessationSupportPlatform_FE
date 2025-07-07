import LazyLoad from "@/lazyload";
import { Navigate, type RouteObject } from "react-router-dom";
import { Paths } from "../path";

const MemberDashboard = LazyLoad("./pages/dashboard/member");
const CigaretteHealthInfo = LazyLoad("./pages/tracking/info");
const CreatePlanPage = LazyLoad("./pages/tracking/CreatePlanPage");

export const memberRoutes = [
  { index: true, element: <Navigate to={Paths.MEMBER.DASHBOARD} /> },
  { index: true, path: Paths.MEMBER.DASHBOARD, element: <MemberDashboard /> },
];

export const premiumRoutes: RouteObject[] = [
  {
    path: Paths.PREMIUM.TRACKING.ROOT,
    children: [
      {
        index: true,
        path: Paths.PREMIUM.TRACKING.INFO,
        element: <CigaretteHealthInfo />,
      },
      { path: Paths.PREMIUM.TRACKING.CREATE_PLAN, element: <CreatePlanPage /> },
    ],
  },
];
