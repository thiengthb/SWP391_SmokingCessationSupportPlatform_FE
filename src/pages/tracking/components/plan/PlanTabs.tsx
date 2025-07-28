import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, LineChart, ListChecks } from "lucide-react";
import { CurrentPhaseSummary } from "./CurrentPhaseSummary";
import { PlanOverview } from "./PlanOverview";
import PlanPhase from "./PlanPhase";
import type { QuitPlan } from "../../PlanTrackingTab";
import type { Phase } from "@/types/models/phase";
import { useMemo } from "react";

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
  addTipToPhase: (phaseIndex: number, tipContent: string) => void;
  deleteTipFromPhase: (phaseId: string, tipId: string) => void;
  updateTipInPhase: (phaseId: string, tipId: string, content: string) => void;
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
  addTipToPhase,
  deleteTipFromPhase,
  updateTipInPhase,
}: PlanTabsProps) {
  // Process and sort phases to ensure proper order
  const sortedPhases = useMemo(() => {
    return [...plan.phases].sort((a, b) => {
      // Sort by phaseNo if available
      if (a.phaseNo && b.phaseNo) {
        return a.phaseNo - b.phaseNo;
      }
      // Fall back to sorting by dates
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  }, [plan.phases]);

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
          {sortedPhases.length > 0 ? (
            sortedPhases.map((phase, index) => (
              <PlanPhase
                key={phase.id}
                phase={phase}
                phaseIndex={index}
                updatePhase={(_index, phaseUpdate) => {
                  try {
                    const phaseId = phase.id;
                    updatePhase(phaseId, phaseUpdate);
                  } catch (error) {
                    console.error("Error updating phase:", error);
                  }
                }}
                deletePhase={(_index) => {
                  try {
                    deletePhase(phase.id);
                  } catch (error) {
                    console.error("Error deleting phase:", error);
                  }
                }}
                isFirst={index === 0}
                isLast={index === sortedPhases.length - 1}
                isCurrent={currentPhase?.id === phase.id}
                addTipToPhase={(tipContent) => {
                  try {
                    if (tipContent) {
                      addTipToPhase(index, String(tipContent));
                    }
                  } catch (error) {
                    console.error("Error adding tip:", error);
                  }
                }}
                deleteTipFromPhase={(tipId) => {
                  try {
                    if (tipId) {
                      deleteTipFromPhase(phase.id, tipId.toString());
                    }
                  } catch (error) {
                    console.error("Error deleting tip:", error);
                  }
                }}
                updateTipInPhase={(tipId, content) => {
                  try {
                    if (tipId && content) {
                      updateTipInPhase(
                        phase.id,
                        tipId.toString(),
                        String(content)
                      );
                    }
                  } catch (error) {
                    console.error("Error updating tip:", error);
                  }
                }}
                canDelete={
                  sortedPhases.length > 1 && currentPhase?.id !== phase.id
                }
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
