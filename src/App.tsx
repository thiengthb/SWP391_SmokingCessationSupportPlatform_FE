import LandingPage from "@/pages/landingpage";

import { useAuth } from "@/context/AuthContext";
import AdminHome from "@/pages/admin/home";
import CoachHome from "@/pages/coach/home"
import MemberHome from "@/pages/member/home"

export default function App() {
  const { userInfo } = useAuth();

  switch (userInfo?.role) {
    case "admin":
      return <AdminHome />;
    case "coach":
      return <CoachHome />;
    case "member":
      return <MemberHome />;
    default:
      return <LandingPage />;
  }
}
