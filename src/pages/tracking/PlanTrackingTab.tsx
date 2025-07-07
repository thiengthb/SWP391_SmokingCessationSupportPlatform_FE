import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { differenceInDays, isAfter, isBefore } from "date-fns";
import useApi from "@/hooks/useApi";
import type { Phase, PlanListItem, PlanStatus } from "@/types/models/Plan";
import CurrentPlanOverview from "./components/plan/CurrentPlanOverview";
import PlansList from "./components/plan/PlansList";
import PlanDetails from "./components/plan/PlanDetails";
import EmptyPlanState from "./components/plan/EmptyPlanState";
import PresetPlans from "./components/plan/PresetPlans";

export interface QuitPlan {
  id: string;
  name: string;
  startDate: Date;
  targetQuitDate: Date;
  description?: string;
  phases: Phase[];
  status?: PlanStatus;
}

export default function PlanTrackingTab() {
  const apiWithInterceptor = useApi();
  const [currentPlan, setCurrentPlan] = useState<QuitPlan | null>(null);
  const [allPlans, setAllPlans] = useState<PlanListItem[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<QuitPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPresetPlans, setShowPresetPlans] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        // Fetch current plan
        const currentResponse = await apiWithInterceptor.get(
          "/v1/plans/my-current-plan"
        );
        if (currentResponse.data?.result) {
          const convertedCurrentPlan = convertApiPlanToQuitPlan(
            currentResponse.data.result
          );
          setCurrentPlan(convertedCurrentPlan);
        }

        // Fetch all plans as PlanListItem
        const allResponse = await apiWithInterceptor.get("/v1/plans/my-plans");
        console.log("All plans response:", allResponse.data);
        if (allResponse.data?.result?.content) {
          // Convert to PlanListItem array
          const planListItems: PlanListItem[] =
            allResponse.data.result.content.map((planData: any) =>
              convertApiPlanToPlanListItem(planData)
            );
          setAllPlans(planListItems);

          // Set selected plan to current plan if it exists
          if (currentResponse.data?.result) {
            const currentPlanConverted = convertApiPlanToQuitPlan(
              currentResponse.data.result
            );
            setSelectedPlan(currentPlanConverted);
          }
        } else if (
          allResponse.data?.result &&
          Array.isArray(allResponse.data.result)
        ) {
          // Handle case where result is directly an array
          const planListItems: PlanListItem[] = allResponse.data.result.map(
            (planData: any) => convertApiPlanToPlanListItem(planData)
          );
          setAllPlans(planListItems);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast.error("Lỗi khi tải kế hoạch");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const convertApiPlanToPlanListItem = (planData: any): PlanListItem => {
    return {
      id: planData.id || crypto.randomUUID(),
      planName: planData.planName || planData.name || "Unnamed Plan",
      startDate: planData.startDate ? new Date(planData.startDate) : new Date(),
      endDate:
        planData.targetQuitDate || planData.endDate
          ? new Date(planData.targetQuitDate || planData.endDate)
          : new Date(),
      status: planData.status || "ACTIVE",
    };
  };

  const convertApiPlanToQuitPlan = (planData: any): QuitPlan => {
    // Add safety checks for dates
    const startDate = planData.startDate
      ? new Date(planData.startDate)
      : new Date();
    const targetQuitDate =
      planData.targetQuitDate || planData.endDate
        ? new Date(planData.targetQuitDate || planData.endDate)
        : new Date();

    return {
      id: planData.id || crypto.randomUUID(),
      name: planData.planName || planData.name || "Unnamed Plan",
      description: planData.description || "",
      startDate,
      targetQuitDate,
      phases: (planData.phases || []).map((phase: any) => ({
        id: phase.id || crypto.randomUUID(),
        phaseName: phase.phaseName || phase.name || "Unnamed Phase",
        description: phase.description || "",
        startDate: phase.startDate ? new Date(phase.startDate) : new Date(),
        endDate: phase.endDate ? new Date(phase.endDate) : new Date(),
        cigaretteBound: phase.cigaretteBound || phase.targetCigarettes || 0,
        completed: phase.completed || false,
        tips: (phase.tips || []).map((tip: any) => ({
          content: typeof tip === "string" ? tip : tip.content || "",
        })),
      })),
      status: planData.status || "ACTIVE",
    };
  };

  const calculateProgress = (plan: QuitPlan) => {
    const today = new Date();
    const totalDays = differenceInDays(plan.targetQuitDate, plan.startDate);
    const daysPassed = differenceInDays(today, plan.startDate);
    return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
  };

  const getPlanStatusBadge = (plan: PlanListItem | QuitPlan) => {
    const today = new Date();
    const endDate = "endDate" in plan ? plan.endDate : plan.targetQuitDate;

    if (isAfter(today, endDate)) {
      return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
    }
    if (isBefore(today, plan.startDate)) {
      return <Badge className="bg-blue-100 text-blue-800">Sắp bắt đầu</Badge>;
    }
    return (
      <Badge className="bg-orange-100 text-orange-800">Đang thực hiện</Badge>
    );
  };

  const handleCreateNewPlan = () => {
    setShowPresetPlans(true);
  };

  const handleBackFromPreset = () => {
    setShowPresetPlans(false);
  };

  const handleSelectPlan = async (plan: PlanListItem) => {
    try {
      // Fetch full plan details when selecting
      const response = await apiWithInterceptor.get(`/v1/plans/${plan.id}`);
      if (response.data?.result) {
        const fullPlan = convertApiPlanToQuitPlan(response.data.result);
        setSelectedPlan(fullPlan);
      } else {
        // Create a QuitPlan from PlanListItem as fallback
        const fallbackPlan: QuitPlan = {
          id: plan.id,
          name: plan.planName,
          startDate: plan.startDate,
          targetQuitDate: plan.endDate,
          phases: [],
          status: plan.status,
        };
        setSelectedPlan(fallbackPlan);
      }
    } catch (error) {
      console.error("Error fetching plan details:", error);
      // Create a QuitPlan from PlanListItem as fallback
      const fallbackPlan: QuitPlan = {
        id: plan.id,
        name: plan.planName,
        startDate: plan.startDate,
        targetQuitDate: plan.endDate,
        phases: [],
        status: plan.status,
      };
      setSelectedPlan(fallbackPlan);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải kế hoạch...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show preset plans when creating new plan or when no plans exist
  if (showPresetPlans || (allPlans.length === 0 && !currentPlan)) {
    return (
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {allPlans.length > 0 && (
            <Button
              variant="ghost"
              onClick={handleBackFromPreset}
              className="mb-4"
            >
              ← Quay lại danh sách kế hoạch
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tạo kế hoạch cai thuốc
            </h1>
            <p className="text-muted-foreground">
              Chọn một kế hoạch mẫu hoặc tạo kế hoạch riêng
            </p>
          </div>
        </motion.div>
        <PresetPlans />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Kế hoạch cai thuốc
          </h1>
          <p className="text-muted-foreground">
            Quản lý và theo dõi tiến trình cai thuốc của bạn
          </p>
        </div>
        <Button
          onClick={handleCreateNewPlan}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo kế hoạch mới
        </Button>
      </motion.div>

      {/* Current Plan Overview */}
      {currentPlan && (
        <CurrentPlanOverview
          currentPlan={currentPlan}
          calculateProgress={calculateProgress}
          getPlanStatusBadge={(plan) => getPlanStatusBadge(plan)}
        />
      )}

      {/* Plans List and Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plans List */}
          <div className="lg:col-span-1">
            <PlansList
              allPlans={allPlans}
              selectedPlan={selectedPlan}
              onSelectPlan={handleSelectPlan}
              onCreateNewPlan={handleCreateNewPlan}
              getPlanStatusBadge={getPlanStatusBadge}
            />
          </div>

          {/* Plan Details */}
          <div className="lg:col-span-2">
            {selectedPlan ? (
              <PlanDetails
                selectedPlan={selectedPlan}
                calculateProgress={calculateProgress}
                getPlanStatusBadge={(plan) => getPlanStatusBadge(plan)}
              />
            ) : (
              <EmptyPlanState />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
