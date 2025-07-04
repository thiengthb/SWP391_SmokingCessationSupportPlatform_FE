import LandingPage from "@/pages/landingpage";
import MemberHome from "@/pages/tracking";
import { useFTND } from "@/contexts/FTNDContext";
import FTNDAssessmentForm from "@/components/ftnd/FTNDAssessmentForm";
import { useAuth } from "./contexts/AuthContext";
import { Role } from "./types/models/account";

function App() {
  const { auth } = useAuth();
  const { showFTNDAssessment, setShowFTNDAssessment } = useFTND();

  const isMember = auth?.accessToken && auth?.currentAcc?.role === Role.MEMBER;

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

      {!isMember && <LandingPage />}
    </>
  );
}

export default App;
