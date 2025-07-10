import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { stats, achievements, healthTimeline } from "@/utils/mockdata/member";
import { useTranslate } from "@/hooks/useTranslate";

export function OverviewTab() {
  const { tMember } = useTranslate();
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {tMember(stat.title)}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {tMember(stat.description)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              {tMember("memberdashboard.healthTimeline.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="flex flex-col space-y-8 p-4">
              {healthTimeline.map((item) => (
                <div key={item.time} className="flex items-start">
                  <div
                    className={`flex h-2 w-2 translate-y-3 rounded-full ${
                      item.completed ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {tMember(item.time)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {tMember(item.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              {tMember("memberdashboard.recentAchievements.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.title} className="space-y-2">
                <div className="flex items-center">
                  <Trophy className="mr-2 h-4 w-4 text-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {tMember(achievement.title)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {tMember(achievement.description)}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    {achievement.progress}%
                  </span>
                </div>
                <Progress value={achievement.progress} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
