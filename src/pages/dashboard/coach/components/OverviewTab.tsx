import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { clientStats, clientProgress } from "@/utils/mockdata/coach";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function OverviewTab() {
  const { t } = useTranslation();
  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'increase':
        return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
      case 'decrease':
        return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowRightIcon className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {clientStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t(stat.title)}</CardTitle>
              {getChangeIcon(t(stat.changeType))}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} {t("page.coachdashboard.lastmonth")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("page.coachdashboard.clientOverview")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientProgress}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="success" fill="hsl(var(--primary))" />
                <Bar dataKey="relapse" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
