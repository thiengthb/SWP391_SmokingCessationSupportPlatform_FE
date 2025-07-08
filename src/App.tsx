import LandingPage from "@/pages/landingpage";
import { useFTND } from "@/contexts/FTNDContext";
import { useAuth } from "./contexts/AuthContext";
import { Role } from "./types/models/account";
import AdminDashboard from "./pages/dashboard/admin";
import LazyLoad from "./lazyload";
import { Role } from "./types/enums/Role";

const MemberHome = LazyLoad("./pages/tracking");
const FTNDAssessmentForm = LazyLoad("./components/ftnd/FTNDAssessmentForm");

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
