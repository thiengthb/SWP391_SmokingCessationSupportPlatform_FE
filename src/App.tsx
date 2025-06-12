import LandingPage from "@/pages/landingpage";

import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "./pages/dashboard/admin";
import CoachDashboard from "./pages/dashboard/coach";
import MemberDashboard from "./pages/dashboard/member";


export default function App() {
  const { userInfo } = useAuth();

  switch (userInfo?.role) {
    case "admin":
      return <AdminDashboard />;
    case "coach":
      return <CoachDashboard />;
    case "member":
      return <MemberDashboard />;
    default:
      return <LandingPage />;
  }
}
