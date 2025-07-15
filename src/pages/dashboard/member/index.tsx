import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./components/OverviewTab";
import { AchievementsTab } from "./components/AchievementsTab";
import { useTranslate } from "@/hooks/useTranslate";
import GoalManagement from "./users";
import { BookingsTab } from "./components/BookingTab";
export default function MemberDashboard() {
  const { tMember } = useTranslate();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {tMember("memberdashboard.title")}
        </h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            {tMember("memberdashboard.tabs.overview")}
          </TabsTrigger>
          <TabsTrigger value="goals">
            {tMember("memberdashboard.tabs.goals")}
          </TabsTrigger>
          <TabsTrigger value="achievements">
            {tMember("memberdashboard.tabs.achievements")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="goals">
          <GoalManagement />
        </TabsContent>
        <TabsContent value="achievements">
          <AchievementsTab />
        </TabsContent>
        <TabsContent value="bookings">
          <BookingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
