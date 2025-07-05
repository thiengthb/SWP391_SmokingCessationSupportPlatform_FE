import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCheck,
  Timer,
  Cigarette,
  Hourglass,
  BadgeCheck,
  Scale,
} from "lucide-react";
import type { PlanTemplate } from "@/data/preset-plan.data";
import type { QuitPlan } from "@/pages/tracking/PlanTrackingTab";

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

export default function PlanCard({
  plan,
  onApply,
  generatedPlan,
}: PlanCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <div className={`rounded-full bg-${plan.bgColor}-100 p-2`}>
            {iconMap[plan.icon]}
          </div>
        </div>
        <CardTitle>{plan.shortName}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-1">
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
      </CardContent>
      <CardFooter className="flex gap-2 mt-auto">
        <Button variant="outline" className="flex-1">
          Xem chi tiết
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => onApply(generatedPlan)}
        >
          Tùy chỉnh kế hoạch
        </Button>
      </CardFooter>
    </Card>
  );
}
