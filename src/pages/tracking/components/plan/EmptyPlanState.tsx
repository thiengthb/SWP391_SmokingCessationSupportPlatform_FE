import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default function EmptyPlanState() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center h-64">
        <div className="text-center">
          <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Chọn một kế hoạch để xem chi tiết
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
