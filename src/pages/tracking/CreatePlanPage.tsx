import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Save,
  ArrowLeft,
  Calendar,
  Target,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlanPhase from "./components/plan/PlanPhase";
import { addDays, startOfToday } from "date-fns";
import { presetPlans, createPresetPlan } from "@/data/presetPlan.data";
import type { Phase, PlanFormData } from "@/types/models/Plan";
import useApi from "@/hooks/useApi";

export default function CreatePlanPage() {
  const navigate = useNavigate();
  const apiWithInterceptor = useApi();
  const [searchParams] = useSearchParams();
  const presetPlanId = searchParams.get("preset");

  const [isLoading, setIsLoading] = useState(false);
  const [planData, setPlanData] = useState<PlanFormData>({
    planName: "",
    description: "",
    duration: 30,
    phases: [],
  });

  useEffect(() => {
    if (presetPlanId) {
      const presetTemplate = presetPlans.find(
        (plan) => plan.id === presetPlanId
      );
      if (presetTemplate) {
        const generatedPlan = createPresetPlan(presetTemplate);
        setPlanData({
          planName: generatedPlan.name,
          description: generatedPlan.description || presetTemplate.description,
          duration: Math.ceil(
            (generatedPlan.targetQuitDate.getTime() -
              generatedPlan.startDate.getTime()) /
              (1000 * 60 * 60 * 24)
          ),
          phases: generatedPlan.phases,
        });
      }
    } else {
      setPlanData((prev) => ({
        ...prev,
        phases: [
          {
            id: crypto.randomUUID(),
            phaseName: "Giai đoạn chuẩn bị",
            description:
              "Chuẩn bị tinh thần và môi trường để bắt đầu cai thuốc",
            startDate: startOfToday(),
            endDate: addDays(startOfToday(), 7),
            cigaretteBound: 15,
            completed: false,
            tips: [
              {
                content:
                  "Thông báo cho gia đình và bạn bè về kế hoạch cai thuốc",
              },
              { content: "Loại bỏ tất cả thuốc lá và đồ hút thuốc khỏi nhà" },
              {
                content:
                  "Chuẩn bị các hoạt động thay thế khi có cảm giác thèm thuốc",
              },
            ],
          },
        ],
      }));
    }
  }, [presetPlanId]);

  const updatePlanField = (field: keyof PlanFormData, value: any) => {
    setPlanData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addPhase = () => {
    const lastPhase = planData.phases[planData.phases.length - 1];
    const newPhase: Phase = {
      id: crypto.randomUUID(),
      phaseName: `Giai đoạn ${planData.phases.length + 1}`,
      description: "",
      startDate: addDays(lastPhase.endDate, 1),
      endDate: addDays(lastPhase.endDate, 8),
      cigaretteBound: Math.max(0, lastPhase.cigaretteBound - 5),
      completed: false,
      tips: [],
    };

    setPlanData((prev) => ({
      ...prev,
      phases: [...prev.phases, newPhase],
    }));
  };

  const updatePhase = (id: string, phaseUpdate: Partial<Phase>) => {
    setPlanData((prev) => ({
      ...prev,
      phases: prev.phases.map((phase) =>
        phase.id === id ? { ...phase, ...phaseUpdate } : phase
      ),
    }));
  };

  const deletePhase = (id: string) => {
    if (planData.phases.length <= 1) {
      toast.error("Kế hoạch phải có ít nhất một giai đoạn");
      return;
    }

    setPlanData((prev) => ({
      ...prev,
      phases: prev.phases.filter((phase) => phase.id !== id),
    }));
  };

  const formatDateToLocalDate = (date: Date) => {
    // Sử dụng múi giờ địa phương để tránh lệch ngày
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSavePlan = async () => {
    if (!planData.planName.trim()) {
      toast.error("Vui lòng nhập tên kế hoạch");
      return;
    }

    if (planData.phases.length === 0) {
      toast.error("Kế hoạch phải có ít nhất một giai đoạn");
      return;
    }

    setIsLoading(true);
    try {
      const planRequest = {
        planName: planData.planName,
        description: planData.description,
        phases: planData.phases.map((phase) => ({
          phaseName: phase.phaseName,
          description: phase.description,
          cigaretteBound: phase.cigaretteBound,
          startDate: formatDateToLocalDate(phase.startDate),
          endDate: formatDateToLocalDate(phase.endDate),
          tips: phase.tips.map((tip) => ({
            content: tip.content,
          })),
        })),
      };

      console.log("Sending plan request:", planRequest); // Debug log
      await apiWithInterceptor.post("/v1/plans", planRequest);
      toast.success("Kế hoạch đã được tạo thành công!");
      navigate("/tracking");
    } catch (error) {
      console.error("Plan creation error:", error); // Debug log
      toast.error("Có lỗi xảy ra khi tạo kế hoạch");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
      <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="hover:bg-white/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {presetPlanId
                ? "Tùy chỉnh kế hoạch mẫu"
                : "Tạo kế hoạch cai thuốc"}
            </h1>
            <p className="text-muted-foreground">
              {presetPlanId
                ? "Điều chỉnh kế hoạch mẫu để phù hợp với bản thân"
                : "Thiết kế kế hoạch cai thuốc phù hợp với bản thân"}
            </p>
          </div>
        </motion.div>

        {/* Plan Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Thông tin kế hoạch
              </CardTitle>
              <CardDescription>
                Điền thông tin cơ bản về kế hoạch cai thuốc của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="planName" className="text-sm font-medium">
                    Tên kế hoạch *
                  </Label>
                  <Input
                    id="planName"
                    value={planData.planName}
                    onChange={(e) =>
                      updatePlanField("planName", e.target.value)
                    }
                    placeholder="Ví dụ: Kế hoạch cai thuốc 30 ngày"
                    className="border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm font-medium">
                    Thời gian dự kiến (ngày)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={planData.duration}
                    onChange={(e) =>
                      updatePlanField(
                        "duration",
                        parseInt(e.target.value) || 30
                      )
                    }
                    min={1}
                    className="border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Mô tả kế hoạch
                </Label>
                <Textarea
                  id="description"
                  value={planData.description}
                  onChange={(e) =>
                    updatePlanField("description", e.target.value)
                  }
                  placeholder="Mô tả chi tiết về mục tiêu và phương pháp cai thuốc..."
                  rows={3}
                  className="border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Phases Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Các giai đoạn thực hiện
              </h2>
              <p className="text-muted-foreground">
                Chia nhỏ kế hoạch thành các giai đoạn cụ thể
              </p>
            </div>
            <Button
              onClick={addPhase}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm giai đoạn
            </Button>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {planData.phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <PlanPhase
                    phase={phase}
                    phaseIndex={index}
                    updatePhase={updatePhase}
                    deletePhase={deletePhase}
                    isFirst={index === 0}
                    isLast={index === planData.phases.length - 1}
                    isCurrent={index === 0}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Target className="h-5 w-5" />
                Tóm tắt kế hoạch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <Calendar className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {planData.phases.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Giai đoạn</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <Target className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {planData.phases[planData.phases.length - 1]
                      ?.cigaretteBound || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mục tiêu cuối
                  </div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <Lightbulb className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {planData.phases.reduce(
                      (total, phase) => total + phase.tips.length,
                      0
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mẹo hỗ trợ
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-end gap-4 pb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate("/tracking")}
            disabled={isLoading}
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleSavePlan}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 min-w-[140px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Đang tạo...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Tạo kế hoạch
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
