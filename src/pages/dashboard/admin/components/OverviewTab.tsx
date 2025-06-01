import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ActivitySquare, Medal, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    icon: Users,
    description: "+12% from last month",
  },
  {
    title: "Active Goals",
    value: "845",
    icon: ActivitySquare,
    description: "Currently in progress",
  },
  {
    title: "Success Rate",
    value: "75%",
    icon: Medal,
    description: "+5% improvement",
  },
  {
    title: "Weekly Growth",
    value: "+22%",
    icon: LineChart,
    description: "User engagement",
  },
];

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add registration list here */}
              <Button className="w-full">View All Users</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Server Load</span>
                  <span>28%</span>
                </div>
                <Progress value={28} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage Usage</span>
                  <span>64%</span>
                </div>
                <Progress value={64} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
