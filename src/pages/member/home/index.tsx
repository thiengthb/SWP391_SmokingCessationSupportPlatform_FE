import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Users, Activity } from "lucide-react";
import { stats, goals } from "@/utils/mockdata/member";

export default function MemberHome() {
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.title} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">{goal.title}</h3>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </div>
            </div>
            <Progress value={goal.progress} className="mb-2" />
            <p className="text-sm text-right text-muted-foreground">{goal.target}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
