import { Badge } from "@/components/ui/badge";

export function PricingHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <Badge className="mb-4">Gói Đăng Ký</Badge>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Chọn Gói Phù Hợp Cho Hành Trình Cai Thuốc Lá
      </h1>
      <p className="text-xl text-muted-foreground">
        Từ miễn phí đến các gói trả phí với nhiều tính năng nâng cao, chúng tôi
        có giải pháp phù hợp cho mọi người trong hành trình cai thuốc lá
      </p>
    </div>
  );
}
