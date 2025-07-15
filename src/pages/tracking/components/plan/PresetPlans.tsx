import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "./PlanCard";
import { PlanGuide } from "./PlanGuide";
import { presetPlans, createPresetPlan } from "@/data/presetPlan.data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, ArrowRight } from "lucide-react";

export default function PresetPlans() {
  const navigate = useNavigate();

  const generatedPlans = useMemo(() => {
    return presetPlans.map((plan) => ({
      template: plan,
      plan: createPresetPlan(plan),
    }));
  }, []);

  // Function to navigate to create plan page with custom plan
  const createCustomPlan = () => {
    navigate("/member/tracking/create-plan");
  };

  // Function to navigate to create plan page with preset plan data
  const handleApplyPresetPlan = (templateId: string) => {
    navigate(`/member/tracking/create-plan?preset=${templateId}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-2">Kế Hoạch Mẫu</h2>
        <p className="text-muted-foreground">
          Chọn một trong các kế hoạch mẫu dưới đây để bắt đầu nhanh chóng. Bạn
          vẫn có thể điều chỉnh các giai đoạn sau khi áp dụng.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-dashed border-2 bg-background hover:bg-muted/10 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Edit className="h-5 w-5 text-primary" />
              </div>
            </div>
            <CardTitle>Tạo Kế Hoạch Riêng</CardTitle>
            <CardDescription>
              Tự thiết kế kế hoạch cai thuốc lá phù hợp với nhu cầu cá nhân của
              bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Tạo kế hoạch từ đầu với các giai đoạn do bạn quyết định
              </div>
            </div>

            <ul className="space-y-1">
              <li className="flex gap-2 text-sm">
                <Plus className="h-4 w-4 text-primary mt-0.5" />
                <span>Tùy chỉnh số lượng giai đoạn</span>
              </li>
              <li className="flex gap-2 text-sm">
                <Plus className="h-4 w-4 text-primary mt-0.5" />
                <span>Đặt mục tiêu phù hợp với bản thân</span>
              </li>
              <li className="flex gap-2 text-sm">
                <Plus className="h-4 w-4 text-primary mt-0.5" />
                <span>Linh hoạt điều chỉnh thời gian</span>
              </li>
            </ul>

            <Button
              onClick={createCustomPlan}
              className="w-full mt-4"
              variant="outline"
            >
              Tạo kế hoạch riêng
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {generatedPlans.map(({ template, plan }) => (
          <PlanCard
            key={template.id}
            plan={template}
            generatedPlan={plan}
            onApply={() => handleApplyPresetPlan(template.id)}
          />
        ))}
      </div>

      <PlanGuide plans={presetPlans} />
    </div>
  );
}
