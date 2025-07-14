import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { stats } from "@/utils/mockdata/member";
import { useTranslate } from "@/hooks/useTranslate";

export function OverviewTab() {
  const { tAdmin, tMember } = useTranslate();
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{tMember(stat.title)}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{tMember(stat.description)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{tAdmin("admindashboard.recentRegistrations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add registration list here */}
              <Button className="w-full">{tAdmin("admindashboard.viewAllUsers")}</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{tAdmin("admindashboard.systemHealth")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{tAdmin("admindashboard.serverLoad")}</span>
                  <span>28%</span>
                </div>
                <Progress value={28} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{tAdmin("admindashboard.storageUsage")}</span>
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
