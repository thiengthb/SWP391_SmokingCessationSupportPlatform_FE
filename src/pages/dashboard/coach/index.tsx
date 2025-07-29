import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./components/OverviewTab";

import { useTranslate } from "@/hooks/useTranslate";
import BookingManagement from "./users/bookingManagement";
import { ClientsTab } from "./components/ClientsTab";
import ScheduleTab from "./components/ScheduleTab";

export default function CoachDashboard() {
  const { tCoach } = useTranslate();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {tCoach("coachdashboard.title")}
        </h2>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          {/* <TabsTrigger value="overview">
            {tCoach("coachdashboard.tabs.overview")}
          </TabsTrigger>
          <TabsTrigger value="clients">
            {tCoach("coachdashboard.tabs.clients")}
          </TabsTrigger> */}
          <TabsTrigger value="schedule">
            {tCoach("coachdashboard.tabs.schedule")}
          </TabsTrigger>
          <TabsTrigger value="requests">
            {tCoach("coachdashboard.tabs.requests")}
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
        <TabsContent value="requests">
          <BookingManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
