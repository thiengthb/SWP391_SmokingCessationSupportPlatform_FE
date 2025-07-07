import { useEffect, useState } from "react";
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
import useApi from "@/hooks/useApi";
import type { UserActivityData, UserDistributionResponse, TimeRange } from "@/types/models/report";
import { format, subDays } from "date-fns";


const COLORS = [
  '#00FF85',
  '#1E90FF',
  '#FF0099',
];



export function ReportsTab() {
  const [userActivityData, setUserActivityData] = useState<UserActivityData[]>([]);
  const [userDistribution, setUserDistribution] = useState<UserDistributionResponse | null>(null);
  const apiWithInterceptor = useApi();
  const [selectedRange, setSelectedRange] = useState<TimeRange>('30-days');

  function getLastNDays(n: number): string[] {
    const days = [];
    const today = new Date();

    for (let i = n - 1; i >= 0; i--) {
      const day = subDays(today, i);
      days.push(format(day, "yyyy-MM-dd")); // match the format in your API data
    }

    return days;
  }


  const getDateRange = (range: TimeRange) => {
    const now = new Date();
    switch (range) {
      case '7-days':
        return {
          from: format(subDays(now, 6), "yyyy-MM-dd'T'00:00:00"),
          to: format(now, "yyyy-MM-dd'T'HH:mm:ss"),
        };
      case '30-days':
        return {
          from: format(subDays(now, 29), "yyyy-MM-dd'T'00:00:00"),
          to: format(now, "yyyy-MM-dd'T'HH:mm:ss"),
        };
      case '12-months':
        return {
          from: format(subDays(now, 365), "yyyy-MM-dd'T'00:00:00"),
          to: format(now, "yyyy-MM-dd'T'HH:mm:ss"),
        };
      case 'since-launch':
        return {
          from: "2024-01-01T00:00:00", // Replace with actual launch date
          to: format(now, "yyyy-MM-dd'T'HH:mm:ss"),
        };
    }
  };



  const fetchUserActivityData = async () => {
    const { from, to } = getDateRange(selectedRange);

    try {
      const response = await apiWithInterceptor.get('/v1/reports/user-growth', {
        params: { from, to },
      });

      if (response.data.result && Array.isArray(response.data.result)) {
        setUserActivityData(response.data.result);
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user activity data:", error);
    }
  };

  const fetchUserDistribution = async () => {
    try {
      const response = await apiWithInterceptor.get('/v1/reports/user-distribution');
      if (response.data.result) {
        setUserDistribution(response.data.result);
      }
    } catch (error) {
      console.error("Failed to fetch distribution", error);
    }
  };

  const pieData = userDistribution ? [
    { name: "Online", value: userDistribution.onlineAccounts },
    { name: "Offline", value: userDistribution.offlineAccounts },
    { name: "Inactive", value: userDistribution.inactiveAccounts },
  ] : [];

  useEffect(() => {
    fetchUserActivityData();
    fetchUserDistribution();
  }, [selectedRange]);

  return (
    <div className="space-y-6">
      <select
        value={selectedRange}
        onChange={(e) => setSelectedRange(e.target.value as TimeRange)}
        className="rounded-md border px-2 py-1"
      >
        <option value="7-days">Past 7 Days</option>
        <option value="30-days">Past 30 Days</option>
        <option value="12-months">Past 12 Months</option>
        <option value="since-launch">Since Launch</option>
      </select>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                  />
                  <Bar
                    dataKey="newAccounts"
                    fill="#1E90FF"
                    name="New Users"
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* <Card>
            <CardHeader>
              <CardTitle>Success Rate by Week</CardTitle>
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
          </Card> */}

          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {userDistribution && (<ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx={200}
                      cy={150}
                      innerRadius={60}
                      outerRadius={90}
                      fill="#0A0A0A"
                      label={(entry) => entry.name}
                    >
                      {pieData.map((_, index: any) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <text
                      x={205}
                      y={150}
                      textAnchor="middle"
                      fontSize={20}
                      fontWeight="bold"
                      fill="#333"
                    >
                      {userDistribution?.totalAccounts}
                    </text>
                    <text
                      x={205}
                      y={170}
                      textAnchor="middle"
                      fontSize={12}
                      fill="#666"
                    >
                      Total Users
                    </text>

                    <Tooltip />
                    <Legend
                      verticalAlign="middle"
                      align="right"
                      layout="vertical"
                    />
                  </PieChart>
                </ResponsiveContainer>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report: any) => (
          <Card key={report.title}>
            <CardHeader>
              <CardTitle className="text-lg">{report.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {report.description}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Last generated: {report.lastGenerated}
                </span>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}
    </div>
  );
}
