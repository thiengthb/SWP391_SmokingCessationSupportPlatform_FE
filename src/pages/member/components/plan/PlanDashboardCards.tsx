import { LineChart, ListChecks, Award, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import type { Phase } from "../../PlanTrackingTab";

interface MilestoneInfo {
  title: string;
  date: Date;
  daysLeft: number;
  type: string;
}

interface PlanDashboardCardsProps {
  progress: number;
  daysSinceStart: number;
  currentPhase: Phase | null;
  nextMilestone: MilestoneInfo;
  targetQuitDate: Date;
  daysRemaining: number;
}

export function PlanDashboardCards({
  progress,
  daysSinceStart,
  currentPhase,
  nextMilestone,
  targetQuitDate,
  daysRemaining,
}: PlanDashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Progress Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-blue-800 flex items-center">
            <LineChart className="h-4 w-4 mr-1" />
            Tiến độ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Progress value={progress} className="h-2" />
            <p className="text-2xl font-bold">{Math.round(progress)}%</p>
            <p className="text-sm text-muted-foreground">
              {daysSinceStart} ngày kể từ khi bắt đầu
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Current Phase Card */}
      <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-green-800 flex items-center">
            <ListChecks className="h-4 w-4 mr-1" />
            Giai đoạn hiện tại
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold">
              {currentPhase?.name || "Chưa bắt đầu"}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentPhase
                ? `Mục tiêu: ${currentPhase.targetCigarettes} điếu/ngày`
                : "Thiết lập giai đoạn để bắt đầu"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Next Milestone Card */}
      <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-amber-800 flex items-center">
            <Award className="h-4 w-4 mr-1" />
            Cột mốc tiếp theo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold">{nextMilestone.title}</p>
            <p className="text-sm text-muted-foreground">
              {nextMilestone.daysLeft > 0
                ? `Còn ${nextMilestone.daysLeft} ngày`
                : "Đã đạt được!"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Target Quit Date Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-purple-800 flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            Ngày dự kiến cai thuốc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold">
              {format(targetQuitDate, "dd/MM/yyyy")}
            </p>
            <p className="text-sm text-muted-foreground">
              {daysRemaining > 0
                ? `Còn ${daysRemaining} ngày`
                : "Bạn đã đến ngày cai thuốc!"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
