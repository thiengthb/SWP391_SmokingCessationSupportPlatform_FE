import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientsTab } from "./components/ClientsTab";
import { ScheduleTab } from "./components/ScheduleTab";
import { OverviewTab } from "./components/OverviewTab";
import { useTranslation } from "react-i18next";

export default function CoachDashboard() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("page.coachdashboard.title")}
        </h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            {t("page.coachdashboard.tabs.overview")}
          </TabsTrigger>
          <TabsTrigger value="clients">
            {t("page.coachdashboard.tabs.clients")}
          </TabsTrigger>
          <TabsTrigger value="schedule">
            {t("page.coachdashboard.tabs.schedule")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="clients">
          <ClientsTab />
        </TabsContent>
        <TabsContent value="schedule">
          <ScheduleTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
