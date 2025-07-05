import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, TrendingUp, Target } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { vi } from "date-fns/locale";
import type { QuitPlan } from "../../PlanTrackingTab";

interface CurrentPlanOverviewProps {
  currentPlan: QuitPlan;
  calculateProgress: (plan: QuitPlan) => number;
  getPlanStatusBadge: (plan: QuitPlan) => React.ReactNode;
}

export default function CurrentPlanOverview({
  currentPlan,
  calculateProgress,
  getPlanStatusBadge,
}: CurrentPlanOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Kế hoạch hiện tại: {currentPlan.name}
              </CardTitle>
              <CardDescription>
                Bắt đầu từ{" "}
                {format(currentPlan.startDate, "dd/MM/yyyy", { locale: vi })} -
                Mục tiêu:{" "}
                {format(currentPlan.targetQuitDate, "dd/MM/yyyy", {
                  locale: vi,
                })}
              </CardDescription>
            </div>
            {getPlanStatusBadge(currentPlan)}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-white/60 rounded-lg border">
              <Calendar className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.max(
                  0,
                  differenceInDays(new Date(), currentPlan.startDate)
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Ngày đã trải qua
              </div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg border">
              <Clock className="h-8 w-8 mx-auto text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.max(
                  0,
                  differenceInDays(currentPlan.targetQuitDate, new Date())
                )}
              </div>
              <div className="text-sm text-muted-foreground">Ngày còn lại</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg border">
              <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(calculateProgress(currentPlan))}%
              </div>
              <div className="text-sm text-muted-foreground">Tiến độ</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tiến độ hoàn thành</span>
              <span>{Math.round(calculateProgress(currentPlan))}%</span>
            </div>
            <Progress value={calculateProgress(currentPlan)} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
