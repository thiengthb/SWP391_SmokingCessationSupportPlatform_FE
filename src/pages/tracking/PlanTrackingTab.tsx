import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Crown, Star } from "lucide-react";
import { toast } from "sonner";
import { differenceInDays, isAfter, isBefore } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import type { PlanListItem } from "@/types/models/plan";
import CurrentPlanOverview from "./components/plan/CurrentPlanOverview";
import PlansList from "./components/plan/PlansList";
import PlanDetails from "./components/plan/PlanDetails";
import EmptyPlanState from "./components/plan/EmptyPlanState";
import PresetPlans from "./components/plan/PresetPlans";
import type { PlanStatus } from "@/types/enums/PlanStatus";
import useApi from "@/hooks/useApi";

export interface QuitPlan {
  id: string;
  name: string;
  startDate: Date;
  targetQuitDate: Date;
  description?: string;
  phases: [];
  status?: PlanStatus;
}

export default function PlanTrackingTab() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<QuitPlan | null>(null);
  const [allPlans, setAllPlans] = useState<PlanListItem[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<QuitPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPresetPlans, setShowPresetPlans] = useState(false);

  const apiWithInterceptor = useApi();

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

  const isPremiumUser = auth?.currentAcc?.havingSubscription;

  const handleUpgradeToPremium = () => {
    navigate("/pricing");
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

  // Show upgrade message for non-premium users
  if (!isPremiumUser) {
    return (
      <div className="container py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Kế hoạch cai thuốc
          </h1>
          <p className="text-muted-foreground">
            Tính năng dành riêng cho thành viên Premium
          </p>
        </motion.div>

        {/* Premium Upgrade Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Crown className="h-10 w-10 text-yellow-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Nâng cấp lên Premium để sử dụng tính năng này
              </h2>

              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Tạo và quản lý kế hoạch cai thuốc cá nhân hóa với sự hướng dẫn
                từ chuyên gia. Theo dõi tiến trình chi tiết và nhận được lời
                khuyên phù hợp với từng giai đoạn.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">
                    Kế hoạch cá nhân hóa
                  </h3>
                  <p className="text-xs text-gray-600">
                    Tạo kế hoạch phù hợp với bạn
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">
                    Theo dõi tiến trình
                  </h3>
                  <p className="text-xs text-gray-600">
                    Xem báo cáo chi tiết hàng ngày
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">
                    Hỗ trợ chuyên gia
                  </h3>
                  <p className="text-xs text-gray-600">
                    Lời khuyên từ chuyên gia y tế
                  </p>
                </div>
              </div>

              <Button
                onClick={handleUpgradeToPremium}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold shadow-md"
                size="lg"
              >
                <Crown className="h-5 w-5 mr-2" />
                Nâng cấp lên Premium ngay
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Show preset plans when user clicks to view them
  if (showPresetPlans) {
    return (
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={handleBackFromPreset}
            className="mb-4"
          >
            ← Quay lại danh sách kế hoạch
          </Button>
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
      {/* Header with Premium Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kế hoạch cai thuốc
            </h1>
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
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

      {/* Preset Plans Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Kế hoạch mẫu có sẵn
            </h2>
            <p className="text-sm text-gray-600">
              Chọn một kế hoạch mẫu để bắt đầu nhanh chóng
            </p>
          </div>
          <Button
            onClick={() => setShowPresetPlans(true)}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            Xem tất cả kế hoạch mẫu
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          💡 Các kế hoạch mẫu được thiết kế bởi chuyên gia và phù hợp với nhiều
          người dùng
        </div>
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
