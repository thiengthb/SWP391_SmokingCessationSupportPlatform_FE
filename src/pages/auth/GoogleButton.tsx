import { defaultAuth, useAuth } from "@/contexts/AuthContext";
import authService from "@/services/api/auth.service";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleButton = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const data = await authService.googleLogin(token || "");
      setAuth({
        isAuthenticated: true,
        currentAcc: data.account,
        accessToken: data.accessToken,
      });
      toast.success("Đăng nhập thành công", {
        description: "Chào mừng bạn trở lại!",
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed", err);
      setAuth(defaultAuth);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => {
        console.log("Login Failed");
        toast.error("Đăng nhập thất bại");
      }}
      shape="pill"
      logo_alignment="center"
      size="large"
    />
  );
};

export default GoogleButton;
