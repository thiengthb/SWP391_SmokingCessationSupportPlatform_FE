import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  format,
  differenceInDays,
  addDays,
  isFuture,
  isPast,
  isToday,
} from "date-fns";
import { vi } from "date-fns/locale";
import {
  CalendarIcon,
  Calendar as CalendarIcon2,
  Target,
  CheckCircle2,
  Cigarette,
  CigaretteOff,
  Clock,
  Trophy,
} from "lucide-react";
import type { QuitPlan, Phase } from "@/pages/member/PlanTrackingTab";

interface PlanOverviewProps {
  plan: QuitPlan;
  updatePlanName: (name: string) => void;
  updatePlanDates: (startDate: Date, targetQuitDate: Date) => void;
  updateNotes: (notes: string) => void;
  currentPhase: Phase | null;
  calculateProgress: () => number;
}

export function PlanOverview({
  plan,
  updatePlanName,
  updatePlanDates,
  updateNotes,
  currentPhase,
  calculateProgress,
}: PlanOverviewProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePlanName(e.target.value);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      // Ensure target quit date is after start date
      const targetQuitDate =
        differenceInDays(plan.targetQuitDate, plan.startDate) > 0
          ? addDays(date, differenceInDays(plan.targetQuitDate, plan.startDate))
          : addDays(date, 14);

      updatePlanDates(date, targetQuitDate);
    }
  };

  const handleQuitDateChange = (date: Date | undefined) => {
    if (date) {
      updatePlanDates(plan.startDate, date);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNotes(e.target.value);
  };

  const getStatusText = () => {
    const today = new Date();

    if (isPast(plan.targetQuitDate) || isToday(plan.targetQuitDate)) {
      return "Đã đến ngày cai thuốc!";
    }

    if (isFuture(plan.startDate)) {
      return "Kế hoạch chưa bắt đầu";
    }

    return "Kế hoạch đang tiến hành";
  };

  const daysUntilQuit = differenceInDays(plan.targetQuitDate, new Date());
  const progress = calculateProgress();

  const daysInPlan = differenceInDays(plan.targetQuitDate, plan.startDate);
  const savedCigarettes = plan.phases.reduce((total, phase) => {
    const phaseDays = differenceInDays(phase.endDate, phase.startDate) + 1;
    // Assuming baseline is 20 cigarettes per day
    const baseline = 20;
    const saved = (baseline - phase.targetCigarettes) * phaseDays;
    return total + Math.max(0, saved);
  }, 0);

  const moneySaved = savedCigarettes * 1500; // 1,500 VND per cigarette (30,000 VND per pack of 20)

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin kế hoạch</CardTitle>
          <CardDescription>
            Thiết lập thông tin cơ bản của kế hoạch cai thuốc
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plan-name">Tên kế hoạch</Label>
            <Input
              id="plan-name"
              value={plan.name}
              onChange={handleNameChange}
              placeholder="Nhập tên kế hoạch của bạn"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ngày bắt đầu</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      isToday(plan.startDate) ? "text-primary" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(plan.startDate, "EEEE, dd/MM/yyyy", { locale: vi })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={plan.startDate}
                    onSelect={handleStartDateChange}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Ngày bỏ thuốc hoàn toàn</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="quit-date"
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      isToday(plan.targetQuitDate) ? "text-primary" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(plan.targetQuitDate, "EEEE, dd/MM/yyyy", {
                      locale: vi,
                    })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={plan.targetQuitDate}
                    onSelect={handleQuitDateChange}
                    disabled={(date) =>
                      differenceInDays(date, plan.startDate) < 1
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan-notes">Ghi chú</Label>
            <Textarea
              id="plan-notes"
              value={plan.notes}
              onChange={handleNotesChange}
              placeholder="Thêm ghi chú, lý do bạn muốn cai thuốc, mục tiêu cá nhân..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Tiến độ của bạn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>Tiến trình kế hoạch</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30"
                  >
                    {getStatusText()}
                  </Badge>
                </div>

                <div>
                  {daysUntilQuit > 0 ? (
                    <Badge variant="secondary">
                      Còn {daysUntilQuit} ngày đến ngày bỏ thuốc
                    </Badge>
                  ) : (
                    <Badge variant="default">Đã đến ngày bỏ thuốc!</Badge>
                  )}
                </div>
              </div>

              {currentPhase && (
                <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                  <div
                    className={`rounded-full p-2 ${
                      currentPhase.completed ? "bg-green-100" : "bg-primary/10"
                    }`}
                  >
                    {currentPhase.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{currentPhase.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Giai đoạn hiện tại: {currentPhase.targetCigarettes}{" "}
                      điếu/ngày
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Thành tựu dự kiến
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col bg-muted/30 rounded-lg p-3">
                <div className="text-sm text-muted-foreground mb-1">
                  Thời gian kế hoạch
                </div>
                <div className="font-semibold">{daysInPlan} ngày</div>
              </div>

              <div className="flex flex-col bg-muted/30 rounded-lg p-3">
                <div className="text-sm text-muted-foreground mb-1">
                  Điếu thuốc không hút
                </div>
                <div className="font-semibold">{savedCigarettes} điếu</div>
              </div>

              <div className="flex flex-col bg-muted/30 rounded-lg p-3">
                <div className="text-sm text-muted-foreground mb-1">
                  Tiền tiết kiệm
                </div>
                <div className="font-semibold">
                  {new Intl.NumberFormat("vi-VN").format(moneySaved)} ₫
                </div>
              </div>

              <div className="flex flex-col bg-muted/30 rounded-lg p-3">
                <div className="text-sm text-muted-foreground mb-1">
                  Số giai đoạn
                </div>
                <div className="font-semibold">
                  {plan.phases.length} giai đoạn
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <div className="flex flex-col items-center">
                <Cigarette className="h-8 w-8 text-red-400" />
                <span className="text-xl font-bold mt-1">→</span>
                <CigaretteOff className="h-8 w-8 text-green-500" />
              </div>

              <div className="flex flex-col border-l pl-4 max-w-[180px]">
                <p className="text-sm">
                  Mỗi ngày bỏ thuốc giúp cơ thể bạn phục hồi dần và giảm nguy cơ
                  các bệnh tim mạch, phổi.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
