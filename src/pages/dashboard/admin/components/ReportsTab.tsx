import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  userActivityData,
  successRateData,
  userDistributionData,
  reports,
} from "@/utils/mockdata/admin";
import { useTranslation } from "react-i18next";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--destructive))",
];

export function ReportsTab() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {t("page.dashboard.analytics.userActivityTrends")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#000"
                    name="Active Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="new"
                    stroke="#000"
                    name="New Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("page.dashboard.analytics.successRateByWeek")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={successRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#000" name="Success Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {t("page.dashboard.analytics.userDistribution")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      label={(entry) => entry.name}
                    >
                      {userDistributionData.map((_, index: any) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      verticalAlign="middle"
                      align="right"
                      layout="vertical"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report: any) => (
          <Card key={report.title}>
            <CardHeader>
              <CardTitle className="text-lg">{t(report.title)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t(report.description)}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  {t("page.dashboard.analytics.lastGenerated")}:{" "}
                  {report.lastGenerated}
                </span>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {t("page.dashboard.analytics.download")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
