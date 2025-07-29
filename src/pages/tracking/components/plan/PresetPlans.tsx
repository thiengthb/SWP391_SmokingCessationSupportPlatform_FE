import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./PlanCard";
import { PlanGuide } from "./PlanGuide";
import { presetPlans, createPresetPlan } from "@/data/presetPlan.data";
import { useFTND } from "@/contexts/FTNDContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  ArrowRight,
  Target,
  Star,
  Cigarette,
  Timer,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Map of icon strings to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  Timer: Timer,
  Cigarette: Cigarette,
  Zap: Zap,
  // Add other icons as needed
};

export default function PresetPlans() {
  const navigate = useNavigate();
  const { healthData } = useFTND();

  const getRecommendedPlanId = (ftndLevel: number): string => {
    if (ftndLevel >= 0 && ftndLevel <= 2) {
      return "gentle-30-day";
    } else if (ftndLevel >= 3 && ftndLevel <= 4) {
      return "balanced-21-day";
    } else if (ftndLevel >= 5 && ftndLevel <= 6) {
      return "intensive-14-day";
    } else if (ftndLevel >= 7 && ftndLevel <= 8) {
      return "rapid-7-day";
    } else if (ftndLevel >= 9 && ftndLevel <= 10) {
      return "intensive-14-day";
    }
    return "balanced-21-day";
  };

  const generatedPlans = useMemo(() => {
    // Get the recommended plan ID based on FTND level
    const recommendedPlanId =
      healthData?.ftndLevel !== undefined
        ? getRecommendedPlanId(healthData.ftndLevel)
        : "balanced-21-day"; // Default recommendation if no FTND data

    // For debugging - log the recommended plan ID
    console.log("Recommended Plan ID:", recommendedPlanId);
    console.log(
      "Available Plan IDs:",
      presetPlans.map((p) => p.id)
    );

    // Force at least one recommendation if no matches are found
    let hasRecommendation = presetPlans.some(
      (plan) => plan.id === recommendedPlanId
    );

    // If no matching plan was found, recommend the balanced plan or the first plan
    const fallbackPlanId = !hasRecommendation
      ? presetPlans.find((p) => p.id === "balanced-21-day")?.id ||
        presetPlans[0]?.id
      : null;

    console.log(
      "Has recommendation:",
      hasRecommendation,
      "Fallback ID:",
      fallbackPlanId
    );

    const plans = presetPlans.map((plan) => {
      const iconName = typeof plan.icon === "string" ? plan.icon : "Timer";
      const iconComponent = iconMap[iconName] || Timer;

      // A plan is recommended if it matches the recommended plan ID or the fallback
      const isRecommended =
        plan.id === recommendedPlanId ||
        (!hasRecommendation && plan.id === fallbackPlanId);

      // Log each plan ID and whether it's recommended
      console.log(`Plan ${plan.id} recommended:`, isRecommended);

      // Add recommendation reason based on FTND level
      let recommendationReason = "";
      if (isRecommended) {
        if (!healthData?.ftndLevel) {
          recommendationReason =
            "Kế hoạch cân bằng, phù hợp cho hầu hết người dùng";
        } else if (healthData.ftndLevel <= 2) {
          recommendationReason = "Phù hợp với mức độ phụ thuộc thấp";
        } else if (healthData.ftndLevel <= 4) {
          recommendationReason = "Phù hợp với mức độ phụ thuộc thấp-trung bình";
        } else if (healthData.ftndLevel <= 6) {
          recommendationReason = "Phù hợp với mức độ phụ thuộc trung bình";
        } else if (healthData.ftndLevel <= 8) {
          recommendationReason = "Phù hợp với mức độ phụ thuộc cao";
        } else {
          recommendationReason = "Phù hợp với mức độ phụ thuộc rất cao";
        }
      }

      return {
        template: {
          ...plan,
          icon: iconComponent,
        },
        plan: createPresetPlan(plan),
        isRecommended,
        recommendationReason,
      };
    });

    // Enhanced sorting to prioritize recommended plans
    return plans.sort((a, b) => {
      if (a.isRecommended && !b.isRecommended) return -1;
      if (!a.isRecommended && b.isRecommended) return 1;
      return 0;
    });
  }, [healthData]);

  // Function to navigate to create plan page with custom plan
  const createCustomPlan = () => {
    navigate("/member/tracking/create-plan");
  };

  // Function to navigate to create plan page with preset plan data
  const handleApplyPresetPlan = (templateId: string) => {
    navigate(`/member/tracking/create-plan?preset=${templateId}`);
  };

  return (
    <div className="space-y-8">
      {/* Enhanced header with gradient background */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center shadow-sm border border-blue-100">
        <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
          Kế Hoạch Cai Thuốc Lá
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Chọn một kế hoạch phù hợp với nhu cầu của bạn hoặc tùy chỉnh kế hoạch
          riêng. Tất cả các kế hoạch đều có thể điều chỉnh sau khi áp dụng.
        </p>

        {/* FTND information and recommendation guide */}
        {healthData?.ftndLevel !== undefined && (
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium">
            <Target className="h-4 w-4" />
            FTND Level: {healthData.ftndLevel} -{" "}
            {healthData.ftndLevel <= 2
              ? "Phụ thuộc thấp"
              : healthData.ftndLevel <= 4
              ? "Phụ thuộc thấp-trung bình"
              : healthData.ftndLevel <= 6
              ? "Phụ thuộc trung bình"
              : healthData.ftndLevel <= 8
              ? "Phụ thuộc cao"
              : "Phụ thuộc rất cao"}
          </div>
        )}
      </div>

      {/* Plan recommendation explanation */}
      {healthData?.ftndLevel !== undefined && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 flex items-start gap-4">
          <div className="bg-amber-100 rounded-full p-2.5 mt-1">
            <Star className="h-5 w-5 text-amber-600" fill="currentColor" />
          </div>
          <div>
            <h3 className="font-medium text-amber-900 text-lg mb-1">
              Kế hoạch được đề xuất cho bạn
            </h3>
            <p className="text-amber-800">
              Dựa trên mức độ phụ thuộc nicotine (FTND Level:{" "}
              {healthData.ftndLevel}), chúng tôi đã đề xuất kế hoạch phù hợp
              nhất với tình trạng của bạn. Kế hoạch được đánh dấu{" "}
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none ml-1 mr-1">
                <Star className="h-3 w-3 mr-0.5" fill="currentColor" />
                Đề xuất
              </Badge>{" "}
              là kế hoạch lý tưởng để bắt đầu hành trình cai thuốc của bạn.
            </p>
          </div>
        </div>
      )}

      {/* Plans grid with improved layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {generatedPlans.map(({ template, plan, isRecommended }) => (
          <div key={template.id} className="relative flex-grow">
            {isRecommended && (
              <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1.5 shadow-lg whitespace-nowrap border border-yellow-300 text-sm font-medium animate-pulse">
                <Star className="h-4 w-4 mr-1.5 inline" fill="currentColor" />
                Đề xuất
              </Badge>
            )}

            <PlanCard
              plan={template}
              generatedPlan={plan}
              onApply={() => handleApplyPresetPlan(template.id)}
              isRecommended={isRecommended}
            />
          </div>
        ))}
      </div>

      <Card className="border-dashed border-2 bg-gradient-to-r from-gray-50 to-slate-50 hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Edit className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl">Tạo Kế Hoạch Riêng</CardTitle>
          <CardDescription className="text-base">
            Tự thiết kế kế hoạch cai thuốc lá phù hợp với nhu cầu cá nhân của
            bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground bg-background/80 p-3 rounded-md">
            Tạo kế hoạch từ đầu với các giai đoạn do bạn quyết định, phù hợp với
            lối sống và mục tiêu cá nhân
          </div>

          <ul className="space-y-2.5 mt-2">
            <li className="flex gap-2.5 text-sm items-start">
              <Plus className="h-4 w-4 text-primary mt-1" />
              <span>
                Tùy chỉnh số lượng giai đoạn và thời gian mỗi giai đoạn
              </span>
            </li>
            <li className="flex gap-2.5 text-sm items-start">
              <Plus className="h-4 w-4 text-primary mt-1" />
              <span>
                Đặt mục tiêu giảm số lượng thuốc lá theo tiến độ riêng
              </span>
            </li>
            <li className="flex gap-2.5 text-sm items-start">
              <Plus className="h-4 w-4 text-primary mt-1" />
              <span>
                Linh hoạt điều chỉnh thời gian để phù hợp với lịch trình của bạn
              </span>
            </li>
          </ul>

          <Button
            onClick={createCustomPlan}
            className="w-full mt-4 py-6 text-base group"
          >
            Tạo kế hoạch riêng
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Thông tin chi tiết về các kế hoạch
        </h3>
        <PlanGuide plans={presetPlans} />
      </div>
    </div>
  );
}
