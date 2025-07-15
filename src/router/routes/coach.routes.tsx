import LazyLoad from "@/lazyload";
import { Navigate, type RouteObject } from "react-router-dom";
import { Paths } from "../../constants/path";

const CoachDashboard = LazyLoad("./pages/dashboard/coach");

export const coachRoutes: RouteObject[] = [
  { index: true, element: <Navigate to={Paths.COACH.DASHBOARD} /> },
  { index: true, path: Paths.COACH.DASHBOARD, element: <CoachDashboard /> },
];
