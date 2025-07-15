import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from "recharts";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePremiumDistributionSwr, useRevenueSwr, useUserGrowthSwr, useUserDistributionSwr } from "@/hooks/swr/useReportSwr";
import type { UserGrowthData, TimeRange } from "@/types/models/report";
import {
  startOfWeek, endOfWeek, startOfMonth, endOfMonth,
  startOfYear, endOfYear, format, parseISO
} from "date-fns";
import { useTranslate } from "@/hooks/useTranslate";

const COLORS = ['#00FF85', '#1E90FF', '#FF0099'];

type DrillContext = {
  level: TimeRange;
  from: string;
  to: string;
};

export function ReportsTab() {
  const { tAdmin } = useTranslate();
  const [selectedRange, setSelectedRange] = useState<TimeRange>('Monthly');

  const getDateRange = (range: TimeRange) => {
    const now = new Date();
    switch (range) {
      case 'Weekly':
        return {
          from: format(startOfWeek(now, { weekStartsOn: 0 }), "yyyy-MM-dd'T'00:00:00"),
          to: format(endOfWeek(now, { weekStartsOn: 0 }), "yyyy-MM-dd'T'23:59:59"),
        };
      case 'Monthly':
        return {
          from: format(startOfMonth(now), "yyyy-MM-dd'T'00:00:00"),
          to: format(endOfMonth(now), "yyyy-MM-dd'T'23:59:59"),
        };
      case 'Yearly':
        return {
          from: format(startOfYear(now), "yyyy-MM-dd'T'00:00:00"),
          to: format(endOfYear(now), "yyyy-MM-dd'T'23:59:59"),
        };
      default:
        throw new Error(`Invalid time range: ${range}`);
    }
  };

  const getInitialDrill = (): DrillContext => {
    const { from, to } = getDateRange(selectedRange);
    return { level: selectedRange, from, to };
  };

  const [drillStack, setDrillStack] = useState<DrillContext[]>(() => [getInitialDrill()]);
  const currentDrill = drillStack[drillStack.length - 1];

  useEffect(() => {
    setDrillStack([getInitialDrill()]);
  }, [selectedRange]);

  const generateDateLabels = (from: string, to: string) => {
    const labels = [];
    const start = new Date(from);
    const end = new Date(to);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      labels.push(format(new Date(d), "yyyy-MM-dd"));
    }
    return labels;
  };

  const groupDataByRangeUnit = (data: UserGrowthData[], range: TimeRange): UserGrowthData[] => {
    const groupedMap = new Map<string, number>();
    data.forEach((item) => {
      const date = parseISO(item.date);
      let key = item.date;
      if (range === "Monthly") {
        const weekOfMonth = Math.ceil(date.getDate() / 7);
        const start = new Date(date.getFullYear(), date.getMonth(), (weekOfMonth - 1) * 7 + 1);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        const lastDay = endOfMonth(date);
        if (end > lastDay) end.setDate(lastDay.getDate());
        key = `W${weekOfMonth} (${format(start, "MMM d")}–${format(end, "d")})`;
      } else if (range === "Yearly") {
        key = format(date, "MMM");
      } else if (range === "Weekly") {
        key = `${format(date, "MMM d")}\n${format(date, "EEE")}`;
      }
      groupedMap.set(key, (groupedMap.get(key) ?? 0) + item.newAccounts);
    });

    return Array.from(groupedMap.entries()).map(([date, newAccounts]) => ({ date, newAccounts }));
  };

  const fillMissingDates = (rawData: UserGrowthData[], from: string, to: string): UserGrowthData[] => {
    const dateLabels = generateDateLabels(from, to);
    const dataMap = new Map(rawData.map((item) => [item.date, item]));
    return dateLabels.map((date) => ({
      date,
      newAccounts: dataMap.get(date)?.newAccounts ?? 0,
    }));
  };

  const { revenue = [], isLoading: isRevenueLoading } = useRevenueSwr(currentDrill.from, currentDrill.to);
  const { userGrowth = [], isLoading: isUserGrowthLoading } = useUserGrowthSwr(currentDrill.from, currentDrill.to);
  useEffect(() => {
    console.log("SWR fetching:", currentDrill);
  }, [currentDrill]);
  const { userDistribution, isLoading: isUserDistributionLoading } = useUserDistributionSwr();
  const { premiumDistribution, isLoading: isPremiumLoading } = usePremiumDistributionSwr();

  const filledUserGrowth = fillMissingDates(userGrowth, currentDrill.from, currentDrill.to);
  const groupedUserGrowth = groupDataByRangeUnit(filledUserGrowth, currentDrill.level);

  const pieUserData = userDistribution ? [
    { name: "Online", value: userDistribution.onlineAccounts },
    { name: "Offline", value: userDistribution.offlineAccounts },
    { name: "Inactive", value: userDistribution.inactiveAccounts },
  ] : [];

  const piePremiumData = premiumDistribution ? [
    { name: "Premium", value: premiumDistribution.premiumAccounts },
    { name: "Non-Premium", value: premiumDistribution.nonPremiumAccounts },
  ] : [];

  const handleDrillDown = (barData: UserGrowthData) => {
    if (currentDrill.level === "Yearly") {
      const month = new Date(`${barData.date} 1, ${new Date().getFullYear()}`);
      const from = format(startOfMonth(month), "yyyy-MM-dd'T'00:00:00");
      const to = format(endOfMonth(month), "yyyy-MM-dd'T'23:59:59");
      setDrillStack([...drillStack, { level: "Monthly", from, to }]);
    } else if (currentDrill.level === "Monthly") {
      const match = barData.date.match(/\(([^)]+)\)/);
      if (match) {
        const [startStr, endStr] = match[1].split("–");
        const currentYear = new Date().getFullYear();
        const month = barData.date.match(/\w{3}/)?.[0] ?? "Jul";
        const from = format(new Date(`${month} ${startStr.trim()}, ${currentYear}`), "yyyy-MM-dd'T'00:00:00");
        const to = format(new Date(`${month} ${endStr.trim()}, ${currentYear}`), "yyyy-MM-dd'T'23:59:59");
        setDrillStack([...drillStack, { level: "Weekly", from, to }]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {selectedRange} <span className="ml-2">▼</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["Weekly", "Monthly", "Yearly"].map((range) => (
            <DropdownMenuItem key={range} onClick={() => setSelectedRange(range as TimeRange)}>
              {range}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {tAdmin("admindashboard.analytics.userActivityTrends")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {isUserGrowthLoading ? (
                <div className="flex items-center justify-center h-full">Loading user growth data...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={groupedUserGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                    <Bar dataKey="newAccounts" fill="#1E90FF" name="New Users" barSize={24} onClick={handleDrillDown} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            {drillStack.length > 1 && (
              <Button variant="outline" onClick={() => setDrillStack(drillStack.slice(0, -1))}>
                ← Back to {drillStack.at(-2)?.level ?? selectedRange}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {isRevenueLoading ? (
                <div className="flex items-center justify-center h-full">Loading revenue data...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenue}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                    <Line dataKey="revenue" stroke="#1E90FF" name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>User Distribution</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isUserDistributionLoading ? (
                  <div className="flex items-center justify-center h-full">Loading user distribution...</div>
                ) : userDistribution && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieUserData} dataKey="value" nameKey="name" cx={200} cy={150}
                        innerRadius={60} outerRadius={90} label={(entry) => entry.name}>
                        {pieUserData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
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
                      <Legend verticalAlign="middle" align="right" layout="vertical" />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Subscription Distribution</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isPremiumLoading ? (
                  <div className="flex items-center justify-center h-full">Loading subscription data...</div>
                ) : premiumDistribution && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={piePremiumData} dataKey="value" nameKey="name" cx={200} cy={150}
                        innerRadius={60} outerRadius={90} label={(entry) => entry.name}>
                        {piePremiumData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
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
                        {premiumDistribution?.totalAccounts}
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
                      <Legend verticalAlign="middle" align="right" layout="vertical" />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
