import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { Phase } from "@/types/models/Plan";

interface CurrentPhaseSummaryProps {
  currentPhase: Phase | null;
  onViewAllPhases: () => void;
}

export function CurrentPhaseSummary({
  currentPhase,
  onViewAllPhases,
}: CurrentPhaseSummaryProps) {
  if (!currentPhase) return null;

  return (
    <Card className="bg-white border shadow-sm mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Giai đoạn hiện tại: {currentPhase.phaseName}</CardTitle>
            <CardDescription>
              {format(currentPhase.startDate, "dd/MM/yyyy")} -{" "}
              {format(currentPhase.endDate, "dd/MM/yyyy")}
            </CardDescription>
          </div>
          <Badge
            variant={
              currentPhase.cigaretteBound === 0 ? "secondary" : "default"
            }
          >
            {currentPhase.cigaretteBound} điếu/ngày
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {currentPhase.description}
        </p>
        <div className="bg-muted/30 p-4 rounded-lg space-y-3">
          <h4 className="font-semibold">Gợi ý hành động:</h4>
          <ul className="list-disc pl-5 space-y-1.5">
            {currentPhase.tips.slice(0, 3).map((tip, index) => (
              <li key={index} className="text-sm">
                {tip.content}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/10 pt-3">
        <Button variant="outline" size="sm" onClick={onViewAllPhases}>
          Xem tất cả giai đoạn
        </Button>
      </CardFooter>
    </Card>
  );
}
