import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from "recharts";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePremiumDistributionSwr, useUserGrowthSwr, useUserDistributionSwr, useCompletionRateSwr } from "@/hooks/swr/useReportSwr";
import type { UserGrowthData, TimeRange, CompletionRate } from "@/types/models/report";
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

  const [userGrowthDrillStack, setUserGrowthDrillStack] = useState<DrillContext[]>(() => [getInitialDrill()]);
  const [completionDrillStack, setCompletionDrillStack] = useState<DrillContext[]>(() => [getInitialDrill()]);
  const currentUserGrowthDrill = userGrowthDrillStack.at(-1)!;
  const currentCompletionDrill = completionDrillStack.at(-1)!;

  useEffect(() => {
    const initialDrill = getInitialDrill();
    setUserGrowthDrillStack([initialDrill]);
    setCompletionDrillStack([initialDrill]);
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

  const groupCompletionByRangeUnit = (
    data: CompletionRate[],
    range: TimeRange
  ): CompletionRate[] => {
    const groupedMap = new Map<
      string,
      {
        totalPlans: number;
        totalCompletedPlans: number;
        totalFailedPlans: number;
        totalCancelledPlans: number;
      }
    >();

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

      const current = groupedMap.get(key) ?? {
        totalPlans: 0,
        totalCompletedPlans: 0,
        totalFailedPlans: 0,
        totalCancelledPlans: 0,
      };

      groupedMap.set(key, {
        totalPlans: current.totalPlans + item.totalPlans,
        totalCompletedPlans: current.totalCompletedPlans + item.totalCompletedPlans,
        totalFailedPlans: current.totalFailedPlans + item.totalFailedPlans,
        totalCancelledPlans: current.totalCancelledPlans + item.totalCancelledPlans,
      });
    });

    return Array.from(groupedMap.entries()).map(([date, values]) => ({
      date,
      ...values,
    }));
  };

  const fillMissingDates = (rawData: UserGrowthData[], from: string, to: string): UserGrowthData[] => {
    const dateLabels = generateDateLabels(from, to);
    const dataMap = new Map(rawData.map((item) => [item.date, item]));
    return dateLabels.map((date) => ({
      date,
      newAccounts: dataMap.get(date)?.newAccounts ?? 0,
    }));
  };

  const fillMissingCompletionRates = (
    rawData: typeof completionRate,
    from: string,
    to: string
  ) => {
    const dateLabels = generateDateLabels(from, to);
    const dataMap = new Map(rawData.map((item) => [item.date, item]));
    return dateLabels.map((date) => ({
      date,
      totalPlans: dataMap.get(date)?.totalPlans ?? 0,
      totalCompletedPlans: dataMap.get(date)?.totalCompletedPlans ?? 0,
      totalFailedPlans: dataMap.get(date)?.totalFailedPlans ?? 0,
      totalCancelledPlans: dataMap.get(date)?.totalCancelledPlans ?? 0,
    }));
  };

  const { userGrowth = [], isLoading: isUserGrowthLoading } = useUserGrowthSwr(currentUserGrowthDrill.from, currentUserGrowthDrill.to);
  const { completionRate = [], isLoading: isCompletionRateLoading } = useCompletionRateSwr(currentCompletionDrill.from, currentCompletionDrill.to);
  const { userDistribution, isLoading: isUserDistributionLoading } = useUserDistributionSwr();
  const { premiumDistribution, isLoading: isPremiumLoading } = usePremiumDistributionSwr();

  const filledUserGrowth = fillMissingDates(userGrowth, currentUserGrowthDrill.from, currentUserGrowthDrill.to);
  const groupedUserGrowth = groupDataByRangeUnit(filledUserGrowth, currentUserGrowthDrill.level);

  const filledCompletionRates = fillMissingCompletionRates(completionRate, currentCompletionDrill.from, currentCompletionDrill.to);
  const groupedCompletionRates = groupCompletionByRangeUnit(filledCompletionRates, currentCompletionDrill.level);



  const pieUserData = userDistribution ? [
    { name: "Online", value: userDistribution.onlineAccounts },
    { name: "Offline", value: userDistribution.offlineAccounts },
    { name: "Inactive", value: userDistribution.inactiveAccounts },
  ] : [];

  const piePremiumData = premiumDistribution ? [
    { name: "Premium", value: premiumDistribution.premiumAccounts },
    { name: "Non-Premium", value: premiumDistribution.nonPremiumAccounts },
  ] : [];

  const getDrillFromBar = (label: string, level: TimeRange): DrillContext | null => {
    const now = new Date();
    const currentYear = now.getFullYear();

    if (level === "Yearly") {
      const month = new Date(`${label} 1, ${currentYear}`);
      return {
        level: "Monthly",
        from: format(startOfMonth(month), "yyyy-MM-dd'T'00:00:00"),
        to: format(endOfMonth(month), "yyyy-MM-dd'T'23:59:59"),
      };
    } else if (level === "Monthly") {
      const match = label.match(/\(([^)]+)\)/);
      if (match) {
        const [startStr, endStr] = match[1].split("–");
        const month = label.match(/\w{3}/)?.[0] ?? "Jul";
        return {
          level: "Weekly",
          from: format(new Date(`${month} ${startStr.trim()}, ${currentYear}`), "yyyy-MM-dd'T'00:00:00"),
          to: format(new Date(`${month} ${endStr.trim()}, ${currentYear}`), "yyyy-MM-dd'T'23:59:59"),
        };
      }
    }
    return null;
  };

  const handleDrillDown = (barData: UserGrowthData) => {
    const newDrill = getDrillFromBar(barData.date, currentUserGrowthDrill.level);
    if (newDrill) setUserGrowthDrillStack([...userGrowthDrillStack, newDrill]);
  };

  const handleCompletionDrillDown = (barData: CompletionRate) => {
    const newDrill = getDrillFromBar(barData.date, currentCompletionDrill.level);
    if (newDrill) setCompletionDrillStack([...completionDrillStack, newDrill]);
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
            {userGrowthDrillStack.length > 1 && (
              <Button variant="outline" onClick={() => setUserGrowthDrillStack(userGrowthDrillStack.slice(0, -1))}>
                ← Back to {userGrowthDrillStack.at(-2)?.level}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Completion Rates</CardTitle></CardHeader>
          <CardContent>
            {isCompletionRateLoading ? (
              <div className="flex justify-center h-[300px] items-center">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={groupedCompletionRates}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="totalCompletedPlans"
                    name="Completed"
                    fill="#82ca9d"
                    onClick={({ payload }) => handleCompletionDrillDown(payload)}
                  />
                  <Bar
                    dataKey="totalFailedPlans"
                    name="Failed"
                    fill="#ff7f7f"
                    onClick={({ payload }) => handleCompletionDrillDown(payload)}
                  />
                  <Bar
                    dataKey="totalCancelledPlans"
                    name="Cancelled"
                    fill="#ffc658"
                    onClick={({ payload }) => handleCompletionDrillDown(payload)}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            {completionDrillStack.length > 1 && (
              <Button variant="outline" onClick={() => setCompletionDrillStack(completionDrillStack.slice(0, -1))}>
                ← Back to {completionDrillStack.at(-2)?.level}
              </Button>
            )}
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
