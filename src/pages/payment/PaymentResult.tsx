import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  Home,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import useApi from "@/hooks/useApi";

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const navigate = useNavigate();
  const { auth } = useAuth();
  const apiWithInterceptor = useApi();
  const [loading, setLoading] = useState(true);
  const [membershipInfo, setMembershipInfo] = useState<{
    name: string;
    expiryDate: string;
  } | null>(null);

  useEffect(() => {
    const fetchMembershipInfo = async () => {
      if (isSuccess && auth?.currentAcc?.id) {
        try {
          setLoading(true);
          const response = await apiWithInterceptor.get(
            `/v1/users/${auth.currentAcc.id}/membership`
          );
          if (response.data.success) {
            setMembershipInfo({
              name: response.data.result.membershipName,
              expiryDate: new Date(
                response.data.result.expiryDate
              ).toLocaleDateString("vi-VN"),
            });
          }
        } catch (error) {
          console.error("Failed to fetch membership info:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchMembershipInfo();
  }, [isSuccess, auth, apiWithInterceptor]);

  const goToHomePage = () => {
    navigate("/");
  };

  const goToDashboard = () => {
    navigate("/account/profile");
  };

  const retryPayment = () => {
    navigate("/pricing");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader
          className={`text-center pb-6 ${
            isSuccess ? "bg-green-50" : "bg-red-50"
          } rounded-t-lg`}
        >
          {isSuccess ? (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-800">
                Thanh toán thành công!
              </CardTitle>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-red-100 p-3">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-red-800">
                Thanh toán thất bại
              </CardTitle>
            </>
          )}
        </CardHeader>

        <CardContent className="pt-6">
          {isSuccess ? (
            <div className="space-y-4">
              <p className="text-center">
                Cảm ơn bạn đã đăng ký dịch vụ. Gói thành viên của bạn đã được
                kích hoạt thành công!
              </p>

              {loading ? (
                <div className="flex justify-center py-4">
                  <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : membershipInfo ? (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Gói thành viên:
                    </span>
                    <span className="font-medium">{membershipInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Có hiệu lực đến:
                    </span>
                    <span className="font-medium">
                      {membershipInfo.expiryDate}
                    </span>
                  </div>
                </div>
              ) : null}

              <p className="text-center text-sm text-muted-foreground">
                Bạn có thể bắt đầu sử dụng đầy đủ các tính năng của chúng tôi
                ngay bây giờ.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center">
                Rất tiếc, giao dịch của bạn không thể hoàn tất. Vui lòng kiểm
                tra lại thông tin thanh toán hoặc thử lại sau.
              </p>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Các lý do có thể xảy ra:
                </p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Thẻ của bạn không đủ số dư</li>
                  <li>Thông tin thẻ không chính xác</li>
                  <li>Ngân hàng từ chối giao dịch</li>
                  <li>Kết nối mạng không ổn định</li>
                </ul>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Nếu bạn vẫn gặp vấn đề, vui lòng liên hệ với bộ phận hỗ trợ
                khách hàng của chúng tôi.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter
          className={`flex ${
            isSuccess ? "justify-between" : "flex-col space-y-3"
          } pt-2`}
        >
          {isSuccess ? (
            <>
              <Button variant="outline" onClick={goToHomePage}>
                <Home className="mr-2 h-4 w-4" />
                Trang chủ
              </Button>
              <Button onClick={goToDashboard}>
                Đi đến hồ sơ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button className="w-full" onClick={retryPayment}>
                Thử lại
                <RefreshCw className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={goToHomePage}
              >
                <Home className="mr-2 h-4 w-4" />
                Về trang chủ
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
