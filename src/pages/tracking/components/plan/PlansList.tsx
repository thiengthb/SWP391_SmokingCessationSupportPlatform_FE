import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
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
  onCreateNewPlan,
  getPlanStatusBadge,
}: PlansListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Danh sách kế hoạch</CardTitle>
        <CardDescription>Tất cả kế hoạch cai thuốc của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {allPlans.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Chưa có kế hoạch nào</p>
            <Button
              variant="outline"
              onClick={onCreateNewPlan}
              className="mt-3"
            >
              Tạo kế hoạch đầu tiên
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            {allPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedPlan?.id === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => onSelectPlan(plan)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold truncate">{plan.planName}</h3>
                  {getPlanStatusBadge(plan)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {format(plan.startDate, "dd/MM/yyyy", { locale: vi })}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}
