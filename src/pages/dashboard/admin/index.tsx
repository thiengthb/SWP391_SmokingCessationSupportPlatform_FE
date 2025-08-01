import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportsTab } from "./components/ReportsTab";
import UserManagement from "./users";
import { useTranslate } from "@/hooks/useTranslate";
import FeedbackManagement from "./users/adminFeedback";
import AdminGoalsTab from "./components/GoalsTab";
import { OverviewTab } from "./components/OverviewTab";
export default function AdminDashboard() {
 const { tAdmin } = useTranslate();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {tAdmin("admindashboard.admin.title")}
        </h2>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            {tAdmin("admindashboard.admin.tabs.overview")}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {tAdmin("admindashboard.admin.tabs.reports")}
          </TabsTrigger>
          <TabsTrigger value="users">
            {tAdmin("admindashboard.admin.tabs.users")}
          </TabsTrigger>
          <TabsTrigger value="feedback">Feedbacks</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="feedback">
          <FeedbackManagement />
        </TabsContent>

        <TabsContent value="goals">
          <AdminGoalsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
