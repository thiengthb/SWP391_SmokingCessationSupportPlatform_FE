import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { stats } from "@/utils/mockdata/member";
import { useTranslation } from "react-i18next";

export function OverviewTab() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t(stat.title)}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{t(stat.description)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("page.dashboard.recentRegistrations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add registration list here */}
              <Button className="w-full">{t("page.dashboard.viewAllUsers")}</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("page.dashboard.systemHealth")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t("page.dashboard.serverLoad")}</span>
                  <span>28%</span>
                </div>
                <Progress value={28} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t("page.dashboard.storageUsage")}</span>
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
