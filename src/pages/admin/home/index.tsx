import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { stats, users, userDistributionData } from "@/utils/mockdata/admin";

export default function AdminHome() {
  return (
    <div className="container py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center gap-4">
              <stat.icon className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Recent Users</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Badge>{user.role}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">System Overview</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Server Load</span>
                <span>28%</span>
              </div>
              <Progress value={28} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>User Activity</span>
                <span>64%</span>
              </div>
              <Progress value={64} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
