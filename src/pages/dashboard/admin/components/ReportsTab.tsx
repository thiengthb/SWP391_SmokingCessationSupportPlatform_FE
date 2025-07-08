import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { UserActivityData, UserDistributionResponse, TimeRange, RevenueResponse } from "@/types/models/report";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, format, parseISO } from "date-fns";



const COLORS = [
  '#00FF85',
  '#1E90FF',
  '#FF0099',
];



export function ReportsTab() {
  const [userActivityData, setUserActivityData] = useState<UserActivityData[]>([]);
  const [userDistribution, setUserDistribution] = useState<UserDistributionResponse | null>(null);
  const [revenue, setRevenue] = useState<RevenueResponse[]>([])
  const apiWithInterceptor = useApi();
  const [selectedRange, setSelectedRange] = useState<TimeRange>('30-days');


  const getDateRange = (range: TimeRange) => {
    const now = new Date();

    switch (range) {
      case '7-days': {
        const start = startOfWeek(now, { weekStartsOn: 0 }); // Sunday
        const end = endOfWeek(now, { weekStartsOn: 0 });     // Saturday
        return {
          from: format(start, "yyyy-MM-dd'T'00:00:00"),
          to: format(end, "yyyy-MM-dd'T'23:59:59"),
        };
      }

      case '30-days': {
        const start = startOfMonth(now);
        const end = endOfMonth(now);
        return {
          from: format(start, "yyyy-MM-dd'T'00:00:00"),
          to: format(end, "yyyy-MM-dd'T'23:59:59"),
        };
      }

      case '12-months': {
        const start = startOfYear(now);
        const end = endOfYear(now);
        return {
          from: format(start, "yyyy-MM-dd'T'00:00:00"),
          to: format(end, "yyyy-MM-dd'T'23:59:59"),
        };
      }
      default:
        throw new Error(`Invalid time range: ${range}`);
    }
  };
  const { from, to } = getDateRange(selectedRange);

  function generateDateLabels(from: string, to: string): string[] {
    const labels = [];
    const start = new Date(from);
    const end = new Date(to);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      labels.push(format(new Date(d), "yyyy-MM-dd"));
    }

    return labels;
  }

  function groupDataByRangeUnit(data: UserActivityData[], range: TimeRange): UserActivityData[] {
    const groupedMap = new Map<string, number>();

    data.forEach((item) => {
      const date = parseISO(item.date);
      let key = item.date;

      if (range === "30-days") {
        // Group by ISO week
        const weekOfMonth = Math.ceil(date.getDate() / 7);

        const start = new Date(date.getFullYear(), date.getMonth(), (weekOfMonth - 1) * 7 + 1);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        // cut off the end of current month
        const lastDayOfMonth = endOfMonth(date);
        if (end > lastDayOfMonth) {
          end.setDate(lastDayOfMonth.getDate());
        }

        key = `W${weekOfMonth} (${format(start, "MMM d")}–${format(end, "d")})`;
      } else if (range === "12-months") {
        // Group by month
        key = format(date, "MMM");
      } else if (range === "7-days") {
        key = `${format(date, "MMM d")}\n${format(date, "EEE")}`; // date + weekday
      }

      groupedMap.set(key, (groupedMap.get(key) ?? 0) + item.newAccounts);
    });

    return Array.from(groupedMap.entries()).map(([date, newAccounts]) => ({
      date,
      newAccounts,
    }));
  }

  function fillMissingDates(
    rawData: UserActivityData[],
    from: string,
    to: string
  ): UserActivityData[] {
    const dateLabels = generateDateLabels(from, to);
    const dataMap = new Map(rawData.map((item) => [item.date, item]));

    return dateLabels.map((date) => ({
      date,
      newAccounts: dataMap.get(date)?.newAccounts ?? 0,
    }));
  }

  const fetchUserActivityData = async () => {
    try {
      const response = await apiWithInterceptor.get('/v1/reports/user-growth', {
        params: { from, to },
      });

      if (response.data.result && Array.isArray(response.data.result)) {
        const filled = fillMissingDates(response.data.result, from, to);
        const grouped = groupDataByRangeUnit(filled, selectedRange);
        setUserActivityData(grouped);
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

  const fetchRevenue = async () => {
    try {
      const response = await apiWithInterceptor.get('v1/reports/revenue', {
        params: { from, to }
      });
      if (response.data.result) {
        setRevenue(response.data.result);
      }
    } catch (error) {
      console.log("error fetching revenue", error);
    }
  }

  const pieData = userDistribution ? [
    { name: "Online", value: userDistribution.onlineAccounts },
    { name: "Offline", value: userDistribution.offlineAccounts },
    { name: "Inactive", value: userDistribution.inactiveAccounts },
  ] : [];

  useEffect(() => {
    fetchUserActivityData();
    fetchUserDistribution();
    fetchRevenue();
  }, [selectedRange]);

  return (
    <div className="space-y-6">
      <select
        value={selectedRange}
        onChange={(e) => setSelectedRange(e.target.value as TimeRange)}
        className="rounded-md border px-2 py-1"
      >
        <option value="7-days">Weekly</option>
        <option value="30-days">Monthly</option>
        <option value="12-months">Yearly</option>
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
                  <XAxis dataKey="date"
                    interval="preserveStartEnd"
                    tick={{ fontSize: 12 }}
                  />
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

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenue}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                  />
                  <Line
                    dataKey="revenue"
                    fill="#1E90FF"
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Success Rate by Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"
                    />
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
