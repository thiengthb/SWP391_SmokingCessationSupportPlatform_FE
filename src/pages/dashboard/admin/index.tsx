import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./components/OverviewTab";
import { ReportsTab } from "./components/ReportsTab";
import UserManagement from "./users";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("page.dashboard.admin.title")}
        </h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            {t("page.dashboard.admin.tabs.overview")}
          </TabsTrigger>
          <TabsTrigger value="users">
            {t("page.dashboard.admin.tabs.users")}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {t("page.dashboard.admin.tabs.reports")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
