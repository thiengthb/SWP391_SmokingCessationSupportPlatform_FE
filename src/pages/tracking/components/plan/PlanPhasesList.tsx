import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { Phase } from "@/types/models/Plan";

interface PlanPhasesListProps {
  phases: Phase[];
}

export default function PlanPhasesList({ phases }: PlanPhasesListProps) {
  return (
    <div className="space-y-4">
      {phases.map((phase, index) => (
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 border rounded-lg bg-gray-50/50"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">{phase.phaseName}</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Tối đa {phase.cigaretteBound} điếu
              </Badge>
              {phase.completed && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {phase.description}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {format(phase.startDate, "dd/MM/yyyy", { locale: vi })} -{" "}
            {format(phase.endDate, "dd/MM/yyyy", { locale: vi })}
          </p>

          {phase.tips.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Mẹo hỗ trợ:</p>
              <ul className="space-y-1">
                {phase.tips.map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-primary">•</span>
                    <span>{tip.content}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
