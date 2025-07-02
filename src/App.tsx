import LandingPage from "@/pages/landingpage";
import MemberHome from "@/pages/member";
import { useFTND } from "@/contexts/FTNDContext";
import FTNDAssessmentForm from "@/components/ftnd/FTNDAssessmentForm";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { auth } = useAuth();
  const { showFTNDAssessment, setShowFTNDAssessment } = useFTND();

  const isMember = auth?.accessToken && auth?.currentUser?.role === "MEMBER";

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
