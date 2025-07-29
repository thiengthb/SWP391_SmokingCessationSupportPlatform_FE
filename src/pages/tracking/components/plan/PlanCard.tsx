import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCheck, Timer, Cigarette, ArrowRight, Star } from "lucide-react";
import type { PlanTemplate } from "@/data/presetPlan.data";
import type { QuitPlan } from "@/pages/tracking/PlanTrackingTab";
import { type LucideIcon } from "lucide-react";
interface PlanCardProps {
  plan: PlanTemplate & { icon: LucideIcon };
  generatedPlan: QuitPlan;
  onApply: () => void;
  isRecommended?: boolean;
}

// Helper function to get colors based on difficulty
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Dễ":
      return { bg: "bg-green-100", text: "text-green-600" };
    case "Trung bình":
      return { bg: "bg-blue-100", text: "text-blue-600" };
    case "Khó":
      return { bg: "bg-red-100", text: "text-red-600" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-600" };
  }
};

export default function PlanCard({
  plan,
  onApply,
  isRecommended = false,
}: PlanCardProps) {
  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-200 ${
        isRecommended
          ? "border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50"
          : "hover:border-primary/20"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <div
            className={`rounded-full p-2 ${
              isRecommended
                ? "bg-yellow-100"
                : getDifficultyColor(plan.difficulty).bg
            }`}
          >
            <plan.icon
              className={`h-5 w-5 ${
                isRecommended
                  ? "text-yellow-600"
                  : getDifficultyColor(plan.difficulty).text
              }`}
            />
          </div>
        </div>
        <CardTitle
          className={`group-hover:text-primary transition-colors ${
            isRecommended ? "text-orange-800" : ""
          }`}
        >
          {plan.name}
        </CardTitle>
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
      <CardFooter>
        <Button
          onClick={onApply}
          className={`w-full group-hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white
            ${
              isRecommended
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                : ""
            }`}
        >
          {isRecommended && <Star className="mr-2 h-4 w-4" />}
          Áp dụng kế hoạch này
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
