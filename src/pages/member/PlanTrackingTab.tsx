import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { toast } from "sonner";
import { PlanDashboardCards } from "./components/plan/PlanDashboardCards";
import { PlanTabs } from "./components/plan/PlanTabs";
import { PlanFooterNote } from "./components/plan/PlanFooterNote";
import {
  getCurrentPhase,
  getDaysRemaining,
  getDaysSinceStart,
  getNextMilestone,
  calculateProgress,
  validatePlan,
} from "./utils/PlanUtils";
import { DEFAULT_TIPS } from "@/data/presetPlanData";
import useApi from "@/hooks/useApi";
import PresetPlans from "./components/plan/PresetPlans";

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

export default function PlanTrackingTab() {
  const apiWithInterceptor = useApi();
  const [plan, setPlan] = useState<QuitPlan>();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const getMyCurrentPlan = async () => {
      try {
        const response = await apiWithInterceptor.get(
          "/v1/plans/my-current-plan"
        );
        if (response.data) {
          setPlan(response.data.result);
        }
      } catch (error) {
        console.error("Lỗi khi lấy kế hoạch:", error);
        toast.error("Lỗi khi lấy kế hoạch. Vui lòng thử lại sau.");
      }
    };
    getMyCurrentPlan();
  }, []);

  const updatePlanName = (name: string) => {
    setPlan((prev) => (prev ? { ...prev, name } : undefined));
  };

  const updatePlanDates = (startDate: Date, targetQuitDate: Date) => {
    setPlan((prev) =>
      prev ? { ...prev, startDate, targetQuitDate } : undefined
    );
  };

  const addPhase = () => {
    if (!plan) return;
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

    setPlan((prev) =>
      prev
        ? {
            ...prev,
            phases: [...prev.phases, newPhase],
          }
        : undefined
    );

    toast.success("Đã thêm giai đoạn mới");
  };

  const updatePhase = (phaseId: string, updatedPhase: Partial<Phase>) => {
    setPlan((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map((phase) =>
          phase.id === phaseId ? { ...phase, ...updatedPhase } : phase
        ),
      };
    });
  };

  const deletePhase = (phaseId: string) => {
    setPlan((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.filter((phase) => phase.id !== phaseId),
      };
    });

    toast.success("Đã xóa giai đoạn");
  };

  const updateNotes = (notes: string) => {
    setPlan((prev) => (prev ? { ...prev, notes } : undefined));
  };

  const applyPresetPlan = (presetPlan: QuitPlan) => {
    setPlan(presetPlan);
    toast.success("Đã áp dụng kế hoạch mẫu");
  };

  const savePlan = () => {
    if (!plan) {
      toast.error("Không tìm thấy kế hoạch để lưu");
      return;
    }
    const validationResult = validatePlan(plan);
    if (validationResult.isValid) {
      localStorage.setItem("quitSmokingPlan", JSON.stringify(plan));
      toast.success("Kế hoạch đã được lưu thành công");
    } else {
      toast.error(validationResult.message);
    }
  };

  const currentPhase = plan ? getCurrentPhase(plan) : null;
  const nextMilestone = plan ? getNextMilestone(plan.targetQuitDate) : null;
  const progressValue = plan ? calculateProgress(plan) : 0;
  const daysRemaining = plan ? getDaysRemaining(plan.targetQuitDate) : 0;
  const daysSinceStart = plan ? getDaysSinceStart(plan.startDate) : 0;

  const getProgress = () => progressValue;

  return (
    <div className="container py-8">
      {plan === undefined ? (
        <PresetPlans applyPresetPlan={applyPresetPlan} />
      ) : (
        <>
          <PlanDashboardCards
            progress={progressValue}
            daysSinceStart={daysSinceStart}
            currentPhase={currentPhase}
            nextMilestone={nextMilestone}
            targetQuitDate={plan.targetQuitDate}
            daysRemaining={daysRemaining}
          />

          <PlanTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            plan={plan}
            currentPhase={currentPhase}
            calculateProgress={getProgress}
            updatePlanName={updatePlanName}
            updatePlanDates={updatePlanDates}
            updateNotes={updateNotes}
            updatePhase={updatePhase}
            deletePhase={deletePhase}
            addPhase={addPhase}
            applyPresetPlan={applyPresetPlan}
            savePlan={savePlan}
          />
        </>
      )}
      <PlanFooterNote />
    </div>
  );
}
