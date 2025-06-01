import { useAuth } from "@/context/AuthContext";

import MemberDashboard from "./member";
import AdminDashboard from "./admin";
import CoachDashboard from "./coach";

export default function DashboardPage() {
  const { userInfo } = useAuth();

  switch (userInfo?.role) {
    case "admin":
      return <AdminDashboard />;
    case "coach":
      return <CoachDashboard />;
    default:
      return <MemberDashboard />;
  }
}
