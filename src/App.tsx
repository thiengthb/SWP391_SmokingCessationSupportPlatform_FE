import LandingPage from "@/pages/landingpage";
import { useFTND } from "@/contexts/FTNDContext";
import { useAuth } from "./contexts/AuthContext";
import { Role } from "./types/models/account";
import LazyLoad from "./lazyload";

const MemberHome = LazyLoad("./pages/tracking");
const FTNDAssessmentForm = LazyLoad("./components/ftnd/FTNDAssessmentForm");

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
