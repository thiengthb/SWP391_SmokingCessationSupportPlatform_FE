import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Target, Eye } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import PlanPhasesList from "./PlanPhasesList";
import type { QuitPlan } from "../../PlanTrackingTab";

interface PlanDetailsProps {
  selectedPlan: QuitPlan;
  calculateProgress: (plan: QuitPlan) => number;
  getPlanStatusBadge: (plan: QuitPlan) => React.ReactNode;
}

export default function PlanDetails({
  selectedPlan,
  calculateProgress,
  getPlanStatusBadge,
}: PlanDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {selectedPlan.name}
            </CardTitle>
            <CardDescription>{selectedPlan.description}</CardDescription>
          </div>
          {getPlanStatusBadge(selectedPlan)}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="phases">Giai đoạn</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Thời gian</span>
                </div>
                <p className="text-sm">
                  Từ{" "}
                  {format(selectedPlan.startDate, "dd/MM/yyyy", { locale: vi })}{" "}
                  <br />
                  đến{" "}
                  {format(selectedPlan.targetQuitDate, "dd/MM/yyyy", {
                    locale: vi,
                  })}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Giai đoạn</span>
                </div>
                <p className="text-sm">
                  {selectedPlan.phases.length} giai đoạn thực hiện
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tiến độ</span>
                <span>{Math.round(calculateProgress(selectedPlan))}%</span>
              </div>
              <Progress
                value={calculateProgress(selectedPlan)}
                className="h-2"
              />
            </div>
          </TabsContent>

          <TabsContent value="phases" className="mt-6">
            <PlanPhasesList phases={selectedPlan.phases} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
