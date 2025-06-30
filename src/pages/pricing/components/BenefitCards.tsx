import { Calendar, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function BenefitCards() {
  const benefits = [
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Thanh Toán Linh Hoạt",
      description:
        "Không cam kết dài hạn. Chọn thanh toán hàng tháng hoặc hàng năm, có thể hủy bất cứ lúc nào.",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Hỗ Trợ Kịp Thời",
      description:
        "Nhận sự hỗ trợ mỗi khi bạn cần, giúp vượt qua những thời điểm khó khăn trong hành trình cai thuốc.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "Dựa Trên Khoa Học",
      description:
        "Các phương pháp và công cụ được phát triển dựa trên nghiên cứu khoa học về cai nghiện và thay đổi hành vi.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Bảo Mật Dữ Liệu",
      description:
        "Thông tin cá nhân và dữ liệu sức khỏe của bạn được bảo vệ theo tiêu chuẩn bảo mật cao nhất.",
    },
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Lợi Ích Khi Đăng Ký</h2>
        <p className="text-muted-foreground">
          Tận hưởng những lợi ích sau với bất kỳ gói đăng ký nào
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
