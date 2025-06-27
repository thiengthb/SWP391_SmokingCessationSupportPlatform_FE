import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addDays,
  isBefore,
  differenceInDays,
  isAfter,
  isSameDay,
  format,
} from "date-fns";
import { toast } from "sonner";
import {
  Info,
  Plus,
  Save,
  AlertCircle,
  Cigarette,
  CalendarRange,
  Award,
  ListChecks,
  BookOpen,
  LineChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PlanPhase from "./components/PlanPhase";
import { PlanOverview } from "./components/PlanOverview";
import PresetPlans from "./components/PresetPlans";

// Types
export interface Phase {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  targetCigarettes: number;
  description: string;
  completed: boolean;
  tips: string[];
}

export interface QuitPlan {
  id: string;
  name: string;
  startDate: Date;
  targetQuitDate: Date;
  phases: Phase[];
  notes: string;
}

// Default phase tips
const DEFAULT_TIPS = {
  preparation: [
    "Ghi lại những lý do bạn muốn bỏ thuốc lá",
    "Thông báo cho bạn bè và gia đình về kế hoạch của bạn",
    "Xác định những tình huống khiến bạn muốn hút thuốc",
    "Chuẩn bị các biện pháp thay thế: kẹo cao su, snack lành mạnh...",
    "Đặt ra một ngày cụ thể để bỏ thuốc hoàn toàn",
  ],
  reduction: [
    "Giảm dần số lượng điếu thuốc mỗi ngày theo lịch trình",
    "Trì hoãn điếu thuốc đầu tiên của ngày càng lâu càng tốt",
    "Chỉ hút một nửa mỗi điếu thuốc",
    "Không mang thuốc lá theo người",
    "Tìm hoạt động thay thế khi thèm thuốc",
  ],
  quit: [
    "Vứt bỏ tất cả thuốc lá, bật lửa và gạt tàn",
    "Tránh xa những yếu tố kích thích như rượu bia",
    "Uống nhiều nước và tập thể dục nhẹ nhàng",
    "Tham gia nhóm hỗ trợ hoặc cài đặt ứng dụng bỏ thuốc",
    "Thưởng cho bản thân những thành tích nhỏ",
  ],
  maintenance: [
    "Tiếp tục tạo thói quen mới không liên quan đến thuốc lá",
    "Dành tiền tiết kiệm được cho một phần thưởng đặc biệt",
    "Theo dõi sức khỏe cải thiện của bản thân",
    "Học cách đối phó với căng thẳng mà không cần thuốc lá",
    "Tránh những tình huống có thể gây tái nghiện",
  ],
  longterm: [
    "Xây dựng bản sắc mới như một người không hút thuốc",
    "Giúp đỡ người khác trong hành trình bỏ thuốc",
    "Chú ý đến những thay đổi tích cực về sức khỏe",
    "Lập kế hoạch đối phó với những tình huống có thể gây tái nghiện",
    "Ăn mừng các cột mốc: 3 tháng, 6 tháng, 1 năm không hút thuốc",
  ],
};

export default function PlanTrackingTab() {
  // State for active plan
  const [plan, setPlan] = useState<QuitPlan>(() => {
    const savedPlan = localStorage.getItem("quitSmokingPlan");
    if (savedPlan) {
      const parsedPlan = JSON.parse(savedPlan);
      return {
        ...parsedPlan,
        startDate: new Date(parsedPlan.startDate),
        targetQuitDate: new Date(parsedPlan.targetQuitDate),
        phases: parsedPlan.phases.map((phase: any) => ({
          ...phase,
          startDate: new Date(phase.startDate),
          endDate: new Date(phase.endDate),
        })),
      };
    }

    // Default new plan
    const today = new Date();
    const quitDate = addDays(today, 14);

    return {
      id: crypto.randomUUID(),
      name: "Kế hoạch cai thuốc lá",
      startDate: today,
      targetQuitDate: quitDate,
      phases: [
        {
          id: crypto.randomUUID(),
          name: "Chuẩn bị",
          startDate: today,
          endDate: addDays(today, 6),
          targetCigarettes: 10,
          description:
            "Chuẩn bị tinh thần và môi trường để bắt đầu quá trình cai thuốc",
          completed: false,
          tips: DEFAULT_TIPS.preparation,
        },
        {
          id: crypto.randomUUID(),
          name: "Giảm dần",
          startDate: addDays(today, 7),
          endDate: addDays(today, 13),
          targetCigarettes: 5,
          description: "Giảm dần số lượng thuốc lá hút hàng ngày",
          completed: false,
          tips: DEFAULT_TIPS.reduction,
        },
        {
          id: crypto.randomUUID(),
          name: "Bỏ thuốc",
          startDate: quitDate,
          endDate: addDays(quitDate, 7),
          targetCigarettes: 0,
          description: "Ngừng hút thuốc hoàn toàn",
          completed: false,
          tips: DEFAULT_TIPS.quit,
        },
      ],
      notes: "",
    };
  });

  const [activeTab, setActiveTab] = useState("overview");

  // Save plan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quitSmokingPlan", JSON.stringify(plan));
  }, [plan]);

  // Update plan name
  const updatePlanName = (name: string) => {
    setPlan((prev) => ({ ...prev, name }));
  };

  // Update plan dates
  const updatePlanDates = (startDate: Date, targetQuitDate: Date) => {
    setPlan((prev) => ({ ...prev, startDate, targetQuitDate }));
  };

  // Add a new phase
  const addPhase = () => {
    const lastPhase = plan.phases[plan.phases.length - 1];
    const newPhaseStartDate = lastPhase
      ? addDays(lastPhase.endDate, 1)
      : plan.startDate;
    const newPhaseEndDate = addDays(newPhaseStartDate, 7);

    const newPhase: Phase = {
      id: crypto.randomUUID(),
      name: `Giai đoạn ${plan.phases.length + 1}`,
      startDate: newPhaseStartDate,
      endDate: newPhaseEndDate,
      targetCigarettes: lastPhase
        ? Math.max(0, lastPhase.targetCigarettes - 3)
        : 5,
      description: "Mô tả giai đoạn này...",
      completed: false,
      tips: DEFAULT_TIPS.maintenance,
    };

    setPlan((prev) => ({
      ...prev,
      phases: [...prev.phases, newPhase],
    }));

    toast.success("Đã thêm giai đoạn mới");
  };

  // Update a phase
  const updatePhase = (phaseId: string, updatedPhase: Partial<Phase>) => {
    setPlan((prev) => ({
      ...prev,
      phases: prev.phases.map((phase) =>
        phase.id === phaseId ? { ...phase, ...updatedPhase } : phase
      ),
    }));
  };

  // Delete a phase
  const deletePhase = (phaseId: string) => {
    setPlan((prev) => ({
      ...prev,
      phases: prev.phases.filter((phase) => phase.id !== phaseId),
    }));

    toast.success("Đã xóa giai đoạn");
  };

  // Update plan notes
  const updateNotes = (notes: string) => {
    setPlan((prev) => ({ ...prev, notes }));
  };

  // Reset plan with a preset
  const applyPresetPlan = (presetPlan: QuitPlan) => {
    setPlan(presetPlan);
    toast.success("Đã áp dụng kế hoạch mẫu");
  };

  // Validate the plan
  const validatePlan = () => {
    // Check if we have at least one phase
    if (plan.phases.length === 0) {
      toast.error("Kế hoạch cần có ít nhất một giai đoạn");
      return false;
    }

    // Check for date ordering issues
    if (isAfter(plan.startDate, plan.targetQuitDate)) {
      toast.error("Ngày bắt đầu phải trước ngày cai thuốc");
      return false;
    }

    // Check phases
    for (let i = 0; i < plan.phases.length; i++) {
      const phase = plan.phases[i];

      // Check if phase dates are valid
      if (isAfter(phase.startDate, phase.endDate)) {
        toast.error(
          `Giai đoạn "${phase.name}": Ngày bắt đầu phải trước ngày kết thúc`
        );
        return false;
      }

      // Check if phases are in sequence
      if (i > 0) {
        const prevPhase = plan.phases[i - 1];
        if (isBefore(phase.startDate, addDays(prevPhase.endDate, 1))) {
          toast.error(
            `Giai đoạn "${phase.name}" bị chồng lấn với giai đoạn trước`
          );
          return false;
        }
      }
    }

    return true;
  };

  // Save the plan
  const savePlan = () => {
    if (validatePlan()) {
      localStorage.setItem("quitSmokingPlan", JSON.stringify(plan));
      toast.success("Kế hoạch đã được lưu thành công");
    }
  };

  // Determine the current phase based on today's date
  const getCurrentPhase = () => {
    const today = new Date();

    for (const phase of plan.phases) {
      if (
        (isSameDay(today, phase.startDate) ||
          isAfter(today, phase.startDate)) &&
        (isSameDay(today, phase.endDate) || isBefore(today, phase.endDate))
      ) {
        return phase;
      }
    }

    // If today is after all phases, return the last phase
    if (
      plan.phases.length > 0 &&
      isAfter(today, plan.phases[plan.phases.length - 1].endDate)
    ) {
      return plan.phases[plan.phases.length - 1];
    }

    // If today is before any phase, return the first phase
    if (plan.phases.length > 0 && isBefore(today, plan.phases[0].startDate)) {
      return plan.phases[0];
    }

    return null;
  };

  // Calculate days remaining until target quit date
  const getDaysRemaining = () => {
    const today = new Date();
    if (isAfter(today, plan.targetQuitDate)) {
      return 0;
    }
    return differenceInDays(plan.targetQuitDate, today);
  };

  // Calculate days since plan started
  const getDaysSinceStart = () => {
    const today = new Date();
    if (isBefore(today, plan.startDate)) {
      return 0;
    }
    return differenceInDays(today, plan.startDate);
  };

  // Get next milestone
  const getNextMilestone = () => {
    const today = new Date();

    // If we haven't reached the quit date yet
    if (isBefore(today, plan.targetQuitDate)) {
      return {
        title: "Ngày cai thuốc",
        date: plan.targetQuitDate,
        daysLeft: differenceInDays(plan.targetQuitDate, today),
        type: "quit",
      };
    }

    // If we've already quit, show upcoming milestones
    const quitDuration = differenceInDays(today, plan.targetQuitDate);

    if (quitDuration < 7) {
      return {
        title: "1 tuần không hút thuốc",
        date: addDays(plan.targetQuitDate, 7),
        daysLeft: 7 - quitDuration,
        type: "milestone",
      };
    } else if (quitDuration < 30) {
      return {
        title: "1 tháng không hút thuốc",
        date: addDays(plan.targetQuitDate, 30),
        daysLeft: 30 - quitDuration,
        type: "milestone",
      };
    } else if (quitDuration < 90) {
      return {
        title: "3 tháng không hút thuốc",
        date: addDays(plan.targetQuitDate, 90),
        daysLeft: 90 - quitDuration,
        type: "milestone",
      };
    } else if (quitDuration < 365) {
      return {
        title: "1 năm không hút thuốc",
        date: addDays(plan.targetQuitDate, 365),
        daysLeft: 365 - quitDuration,
        type: "milestone",
      };
    } else {
      return {
        title: "Hơn 1 năm không hút thuốc",
        date: addDays(plan.targetQuitDate, 365),
        daysLeft: 0,
        type: "achievement",
      };
    }
  };

  // Calculate progress
  const calculateProgress = () => {
    const today = new Date();

    // If today is before the start date, progress is 0%
    if (isBefore(today, plan.startDate)) {
      return 0;
    }

    // If today is after the target quit date, check if there are phases after the quit date
    if (isAfter(today, plan.targetQuitDate)) {
      const lastPhase = plan.phases[plan.phases.length - 1];

      // If we have phases beyond the quit date, calculate progress based on the last phase end date
      if (lastPhase && isAfter(lastPhase.endDate, plan.targetQuitDate)) {
        const totalDuration = differenceInDays(
          lastPhase.endDate,
          plan.startDate
        );
        const progressDuration = differenceInDays(today, plan.startDate);

        if (isAfter(today, lastPhase.endDate)) {
          return 100; // Beyond the last phase, consider it 100%
        }

        return Math.min(
          100,
          Math.max(0, (progressDuration / totalDuration) * 100)
        );
      }

      // Otherwise, if we're beyond the quit date, consider it 100%
      return 100;
    }

    // Normal progress calculation during the plan
    const totalDuration = differenceInDays(plan.targetQuitDate, plan.startDate);
    const progressDuration = differenceInDays(today, plan.startDate);

    return Math.min(100, Math.max(0, (progressDuration / totalDuration) * 100));
  };

  const currentPhase = getCurrentPhase();
  const nextMilestone = getNextMilestone();
  const progress = calculateProgress();
  const daysRemaining = getDaysRemaining();
  const daysSinceStart = getDaysSinceStart();

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <CalendarRange className="mr-2 h-8 w-8 text-primary" />
          Kế Hoạch Cai Thuốc Lá
        </h1>
        <p className="text-muted-foreground">
          Tạo và quản lý kế hoạch cai thuốc lá theo từng giai đoạn để đạt được
          mục tiêu dễ dàng hơn
        </p>
      </div>

      {/* Dashboard Cards */}
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
                {format(plan.targetQuitDate, "dd/MM/yyyy")}
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

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/40 p-1 rounded-lg">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white"
            >
              <div className="flex items-center">
                <LineChart className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Tổng quan</span>
                <span className="sm:hidden">Tổng quan</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="phases"
              className="data-[state=active]:bg-white"
            >
              <div className="flex items-center">
                <ListChecks className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Giai đoạn</span>
                <span className="sm:hidden">Giai đoạn</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="presets"
              className="data-[state=active]:bg-white"
            >
              <div className="flex items-center">
                <BookOpen className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Kế hoạch mẫu</span>
                <span className="sm:hidden">Mẫu</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <Button onClick={savePlan} className="shadow-sm">
            <Save className="mr-2 h-4 w-4" />
            Lưu kế hoạch
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-6 mt-0">
          {currentPhase && (
            <Card className="bg-white border shadow-sm mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>
                      Giai đoạn hiện tại: {currentPhase.name}
                    </CardTitle>
                    <CardDescription>
                      {format(currentPhase.startDate, "dd/MM/yyyy")} -{" "}
                      {format(currentPhase.endDate, "dd/MM/yyyy")}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      currentPhase.targetCigarettes === 0
                        ? "secondary"
                        : "default"
                    }
                  >
                    {currentPhase.targetCigarettes} điếu/ngày
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {currentPhase.description}
                </p>
                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold">Gợi ý hành động:</h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {currentPhase.tips.slice(0, 3).map((tip, index) => (
                      <li key={index} className="text-sm">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10 pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("phases")}
                >
                  Xem tất cả giai đoạn
                </Button>
              </CardFooter>
            </Card>
          )}

          <PlanOverview
            plan={plan}
            updatePlanName={updatePlanName}
            updatePlanDates={updatePlanDates}
            updateNotes={updateNotes}
            currentPhase={currentPhase}
            calculateProgress={calculateProgress}
          />
        </TabsContent>

        <TabsContent value="phases" className="space-y-6 mt-0">
          <div className="grid gap-6">
            {plan.phases.length > 0 ? (
              plan.phases.map((phase, index) => (
                <PlanPhase
                  key={phase.id}
                  phase={phase}
                  phaseIndex={index}
                  updatePhase={updatePhase}
                  deletePhase={deletePhase}
                  isFirst={index === 0}
                  isLast={index === plan.phases.length - 1}
                  isCurrent={currentPhase?.id === phase.id}
                />
              ))
            ) : (
              <Card className="border-dashed border-2 p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    Chưa có giai đoạn nào
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Hãy thêm các giai đoạn để lập kế hoạch cai thuốc lá phù hợp
                    với bạn
                  </p>
                </div>
              </Card>
            )}

            <Button
              variant="outline"
              onClick={addPhase}
              className="w-full border-dashed border-2 h-14 flex items-center justify-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm giai đoạn
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="presets" className="space-y-6 mt-0">
          <PresetPlans applyPresetPlan={applyPresetPlan} />
        </TabsContent>
      </Tabs>

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
    </div>
  );
}
