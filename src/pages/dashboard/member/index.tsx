import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./components/OverviewTab";
import { GoalsTab } from "./components/GoalsTab";
import { AchievementsTab } from "./components/AchievementsTab";
import { useTranslation } from "react-i18next";

export default function MemberDashboard() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("page.memberdashboard.title")}
        </h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            {t("page.memberdashboard.tabs.overview")}
          </TabsTrigger>
          <TabsTrigger value="goals">
            {t("page.memberdashboard.tabs.goals")}
          </TabsTrigger>
          <TabsTrigger value="achievements">
            {t("page.memberdashboard.tabs.achievements")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="goals">
          <GoalsTab />
        </TabsContent>
        <TabsContent value="achievements">
          <AchievementsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
