import { CheckCheck } from "lucide-react";
import type { PlanTemplate } from "@/data/presetPlanData";

interface PlanGuideProps {
  plans: PlanTemplate[];
}

export function PlanGuide({ plans }: PlanGuideProps) {
  return (
    <div className="bg-muted/30 p-4 rounded-lg border mt-6">
      <h3 className="font-medium mb-2">
        Làm thế nào để chọn kế hoạch phù hợp?
      </h3>
      <ul className="space-y-2 text-sm">
        {plans.map((plan) => (
          <li key={plan.id} className="flex gap-2">
            <CheckCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>
              <strong>{plan.shortName}:</strong> {plan.suitableFor}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
