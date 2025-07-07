import LandingPage from "@/pages/landingpage";
import { useFTND } from "@/contexts/FTNDContext";
import { useAuth } from "./contexts/AuthContext";
import LazyLoad from "./lazyload";
import { Role } from "./types/enums/Role";

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
