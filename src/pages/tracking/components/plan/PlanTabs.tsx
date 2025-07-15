import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, LineChart, ListChecks } from "lucide-react";
import { CurrentPhaseSummary } from "./CurrentPhaseSummary";
import { PlanOverview } from "./PlanOverview";
import PlanPhase from "./PlanPhase";
import type { QuitPlan } from "../../PlanTrackingTab";
import type { Phase } from "@/types/models/Plan";

interface PlanTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  plan: QuitPlan;
  currentPhase: Phase | null;
  calculateProgress: () => number;
  updatePlanName: (name: string) => void;
  updatePlanDates: (startDate: Date, targetQuitDate: Date) => void;
  updateNotes: (notes: string) => void;
  updatePhase: (phaseId: string, updatedPhase: Partial<Phase>) => void;
  deletePhase: (phaseId: string) => void;
  addPhase: () => void;
  applyPresetPlan: (plan: QuitPlan) => void;
  savePlan: () => void;
}

export function PlanTabs({
  activeTab,
  setActiveTab,
  plan,
  currentPhase,
  calculateProgress,
  updatePlanName,
  updatePlanDates,
  updateNotes,
  updatePhase,
  deletePhase,
  addPhase,
}: PlanTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/40 p-1 rounded-lg">
        <TabsList className="bg-transparent">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-white"
          >
            <div className="flex items-center">
              <LineChart className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Tổng quan</span>
              <span className="sm:hidden">Tổng quan</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="phases" className="data-[state=active]:bg-white">
            <div className="flex items-center">
              <ListChecks className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Giai đoạn</span>
              <span className="sm:hidden">Giai đoạn</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="space-y-6 mt-0">
        <CurrentPhaseSummary
          currentPhase={currentPhase}
          onViewAllPhases={() => setActiveTab("phases")}
        />

        <PlanOverview
          plan={plan}
          updatePlanName={updatePlanName}
          updatePlanDates={updatePlanDates}
          updateNotes={updateNotes}
          currentPhase={currentPhase}
          calculateProgress={calculateProgress}
        />
      </TabsContent>

      <TabsContent value="phases" className="space-y-6 mt-0">
        <div className="grid gap-6">
          {plan.phases.length > 0 ? (
            plan.phases.map((phase, index) => (
              <PlanPhase
                key={phase.id}
                phase={phase}
                phaseIndex={index}
                updatePhase={updatePhase}
                deletePhase={deletePhase}
                isFirst={index === 0}
                isLast={index === plan.phases.length - 1}
                isCurrent={currentPhase?.id === phase.id}
              />
            ))
          ) : (
            <Card className="border-dashed border-2 p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Chưa có giai đoạn nào</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Hãy thêm các giai đoạn để lập kế hoạch cai thuốc lá phù hợp
                  với bạn
                </p>
              </div>
            </Card>
          )}

          <Button
            variant="outline"
            onClick={addPhase}
            className="w-full border-dashed border-2 h-14 flex items-center justify-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm giai đoạn
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
