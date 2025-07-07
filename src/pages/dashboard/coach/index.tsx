import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./components/OverviewTab";
import { ScheduleManagement } from "./users";
import BookingManagement from "./users/bookingManagement";

export default function CoachDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Coach Dashboard</h2>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview"><OverviewTab /></TabsContent>
        <TabsContent value="bookings"><BookingManagement /></TabsContent>
        <TabsContent value="schedule"><ScheduleManagement /></TabsContent>
      </Tabs>
    </div>
  );
}
