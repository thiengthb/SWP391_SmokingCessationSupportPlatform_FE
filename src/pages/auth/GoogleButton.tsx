import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/axios";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await api.post("/v1/auth/google/login", {
        token,
      });
      setAuth({
        isAuthenticated: true,
        currentUser: response.data.user,
        accessToken: response.data.accessToken,
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed", err);
      setAuth({
        isAuthenticated: false,
        currentUser: null,
        accessToken: null,
      });
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => console.log("Login Failed")}
      shape="pill"
      logo_alignment="center"
      size="large"
    />
  );
};

export default GoogleButton;
