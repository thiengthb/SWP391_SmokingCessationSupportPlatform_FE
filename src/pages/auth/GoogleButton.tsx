import { defaultAuth, useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/axios";
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
      const response = await api.post("/v1/auth/google/login", {
        token,
      });
      const { account, accessToken } = response.data.result;

      setAuth({
        isAuthenticated: true,
        currentAcc: account,
        accessToken: accessToken,
      });

      console.log("Login successful:", account);
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
