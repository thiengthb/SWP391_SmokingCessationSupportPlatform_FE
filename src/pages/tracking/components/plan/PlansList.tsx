import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import type { PlanListItem } from "@/types/models/plan";
import type { QuitPlan } from "../../PlanTrackingTab";

interface PlansListProps {
  allPlans: PlanListItem[];
  selectedPlan: QuitPlan | null;
  onSelectPlan: (plan: PlanListItem) => void;
  onCreateNewPlan: () => void;
  getPlanStatusBadge: (plan: PlanListItem) => React.ReactNode;
}

export default function PlansList({
  allPlans,
  selectedPlan,
  onSelectPlan,
  getPlanStatusBadge,
}: PlansListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Danh sách kế hoạch
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2">
          {allPlans.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Chưa có kế hoạch nào</p>
              <p className="text-xs mt-1">Tạo kế hoạch đầu tiên của bạn</p>
            </div>
          ) : (
            allPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 border-b last:border-b-0 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedPlan?.id === plan.id ? "bg-muted" : ""
                }`}
                onClick={() => onSelectPlan(plan)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{plan.planName}</h3>
                  {getPlanStatusBadge(plan)}
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Bắt đầu: {format(plan.startDate, "dd/MM/yyyy")}</div>
                  <div>Kết thúc: {format(plan.endDate, "dd/MM/yyyy")}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
