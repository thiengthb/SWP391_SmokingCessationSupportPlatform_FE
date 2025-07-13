import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./components/OverviewTab";
import { ReportsTab } from "./components/ReportsTab";
import UserManagement from "./users";
import FeedbackManagement from "./users/adminFeedback";
import AdminGoalsTab from "./components/GoalsTab";
export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="feedback">Feedbacks</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
{/* 
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent> */}
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="reports">
          <ReportsTab />
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
