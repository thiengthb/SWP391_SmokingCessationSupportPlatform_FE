import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./components/OverviewTab";
import { GoalsTab } from "./components/GoalsTab";
import { AchievementsTab } from "./components/AchievementsTab";

export default function MemberDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Member Dashboard</h2>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview"><OverviewTab /></TabsContent>
        <TabsContent value="goals"><GoalsTab /></TabsContent>
        <TabsContent value="achievements"><AchievementsTab /></TabsContent>
      </Tabs>
    </div>
  );
}
