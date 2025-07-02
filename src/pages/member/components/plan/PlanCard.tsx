import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCheck,
  Timer,
  Cigarette,
  Hourglass,
  BadgeCheck,
  Scale,
} from "lucide-react";
import type { PlanTemplate } from "@/data/presetPlanData";
import type { QuitPlan } from "@/pages/member/PlanTrackingTab";

interface PlanCardProps {
  plan: PlanTemplate;
  onApply: (plan: QuitPlan) => void;
  generatedPlan: QuitPlan;
}

// Map for icon components
const iconMap: Record<string, React.ReactNode> = {
  Hourglass: <Hourglass className="h-5 w-5 text-amber-600" />,
  BadgeCheck: <BadgeCheck className="h-5 w-5 text-red-600" />,
  Scale: <Scale className="h-5 w-5 text-green-600" />,
};

export function PlanCard({ plan, onApply, generatedPlan }: PlanCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <div className={`rounded-full bg-${plan.bgColor}-100 p-2`}>
            {iconMap[plan.icon]}
          </div>
        </div>
        <CardTitle>{plan.shortName}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Timer className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {plan.duration} ngày
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Cigarette className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {plan.cigarettesRange}
            </span>
          </div>
        </div>

        <ul className="space-y-1">
          {plan.benefits.map((benefit, index) => (
            <li key={index} className="flex gap-2 text-sm">
              <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => onApply(generatedPlan)}
          className="w-full mt-4"
          variant="default"
        >
          Áp dụng kế hoạch
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
