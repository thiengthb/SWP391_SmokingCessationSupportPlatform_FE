import LandingPage from "@/pages/landingpage";
import MemberHome from "@/pages/tracking";
import { useFTND } from "@/contexts/FTNDContext";
import FTNDAssessmentForm from "@/components/ftnd/FTNDAssessmentForm";
import { useAuth } from "./contexts/AuthContext";
import { Role } from "./types/models/account";
import AdminDashboard from "./pages/dashboard/admin";

function App() {
  const { auth } = useAuth();
  const { showFTNDAssessment, setShowFTNDAssessment } = useFTND();

  const isMember = auth?.accessToken && auth?.currentAcc?.role === Role.MEMBER;
  const isAdmin = auth?.accessToken && auth?.currentAcc?.role === Role.ADMIN;
  const isGuest = !auth?.accessToken;

  return (
    <>
      {isMember && (
        <>
          <MemberHome />
          <FTNDAssessmentForm
            open={showFTNDAssessment}
            onOpenChange={setShowFTNDAssessment}
          />
        </>
      )}

      {isAdmin && <AdminDashboard />}

      {isGuest && <LandingPage />}
    </>
  );
}

export default App;
