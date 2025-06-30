import { ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HashLink } from "react-router-hash-link";

export function PricingCTA() {
  return (
    <div className="bg-muted rounded-xl p-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Sẵn sàng bắt đầu hành trình cai thuốc lá?
        </h2>
        <p className="text-lg mb-6">
          Chọn gói đăng ký phù hợp với bạn và bắt đầu hành trình hướng tới một
          cuộc sống khỏe mạnh hơn, không thuốc lá.
        </p>
        <Button size="lg">
          <HashLink smooth to="#top">
            Đăng Ký Ngay
          </HashLink>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
        <div className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>Cần tư vấn? Liên hệ hỗ trợ qua số 1900 1234</span>
        </div>
      </div>
    </div>
  );
}
