import { Button } from "@/components/ui/button";
import { AlertCircle, Cigarette, Info } from "lucide-react";

export function PlanFooterNote() {
  return (
    <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 p-5 bg-amber-50 rounded-lg border border-amber-200">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-amber-900">Lưu ý quan trọng</h3>
          <p className="text-sm text-amber-700">
            Cai thuốc lá có thể gặp nhiều thách thức. Hãy tham khảo ý kiến bác
            sĩ hoặc chuyên gia y tế để được hỗ trợ tốt nhất. Đừng nản lòng nếu
            không thành công ngay lập tức, việc kiên trì rất quan trọng.
          </p>
        </div>
      </div>
      <div className="flex flex-col xs:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-amber-300"
        >
          <a href="/cigarette-tracker">
            <Cigarette className="mr-1.5 h-4 w-4" />
            Theo dõi hút thuốc
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-amber-300"
        >
          <a href="/cigarette-tracker/info">
            <Info className="mr-1.5 h-4 w-4" />
            Thông tin hỗ trợ
          </a>
        </Button>
      </div>
    </div>
  );
}
