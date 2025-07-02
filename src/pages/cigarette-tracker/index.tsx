import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { format, subDays, isSameDay, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Calendar,
  Plus,
  Minus,
  Save,
  BarChart2,
  LineChart as LineChartIcon,
  Cigarette,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Leaf,
  Heart,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Interface for cigarette log entry
interface CigaretteLog {
  id: string;
  date: string;
  count: number;
  time?: string;
  notes?: string;
}

// Interface for daily data
interface DailyData {
  date: string;
  count: number;
  formattedDate: string;
}

export default function CigaretteTracker() {
  const { t } = useTranslation();
  // State for tracking cigarette logs
  const [logs, setLogs] = useState<CigaretteLog[]>(() => {
    const saved = localStorage.getItem("cigaretteLogs");
    return saved ? JSON.parse(saved) : [];
  });

  // State for today's count
  const [todayCount, setTodayCount] = useState<number>(() => {
    const today = new Date();
    const saved = localStorage.getItem("cigaretteLogs");
    if (!saved) return 0;

    const logs: CigaretteLog[] = JSON.parse(saved);
    const todayLog = logs.find((log) => isSameDay(parseISO(log.date), today));

    return todayLog ? todayLog.count : 0;
  });

  // Current time state for new log entries
  const [currentTime, setCurrentTime] = useState<string>(
    format(new Date(), "HH:mm")
  );

  // Notes for today's log
  const [notes, setNotes] = useState<string>("");

  // Update localStorage when logs change
  useEffect(() => {
    localStorage.setItem("cigaretteLogs", JSON.stringify(logs));
  }, [logs]);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), "HH:mm"));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Handle increment and decrement of cigarette count
  const handleIncrement = () => {
    setTodayCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (todayCount > 0) {
      setTodayCount((prev) => prev - 1);
    }
  };

  // Manual input change handler
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setTodayCount(value);
    }
  };

  // Update today's log
  const saveToday = () => {
    const today = new Date();
    const todayString = format(today, "yyyy-MM-dd");

    // Check if there's already a log for today
    const existingLogIndex = logs.findIndex((log) =>
      log.date.startsWith(todayString)
    );

    const updatedLogs = [...logs];

    if (existingLogIndex !== -1) {
      // Update existing log
      updatedLogs[existingLogIndex] = {
        ...updatedLogs[existingLogIndex],
        count: todayCount,
        time: currentTime,
        notes: notes,
      };
    } else {
      // Create new log
      updatedLogs.push({
        id: crypto.randomUUID(),
        date: `${todayString}T${currentTime}:00Z`,
        count: todayCount,
        time: currentTime,
        notes: notes,
      });
    }

    setLogs(updatedLogs);
    toast.success(t("cigarett-tracker.today.save"));
  };

  // Prepare data for charts
  const prepareChartData = (): DailyData[] => {
    const last14Days = Array.from({ length: 14 }, (_, i) => {
      const date = subDays(new Date(), 13 - i);
      const dateString = format(date, "yyyy-MM-dd");

      // Find matching log
      const log = logs.find((log) => log.date.startsWith(dateString));

      return {
        date: dateString,
        count: log ? log.count : 0,
        formattedDate: format(date, "dd/MM", { locale: vi }),
      };
    });

    return last14Days;
  };

  const chartData = prepareChartData();

  // Calculate statistics
  const getTotalThisWeek = () => {
    const today = new Date();
    const lastWeek = subDays(today, 7);

    return logs
      .filter((log) => {
        const logDate = parseISO(log.date);
        return logDate >= lastWeek && logDate <= today;
      })
      .reduce((sum, log) => sum + log.count, 0);
  };

  const getAveragePerDay = () => {
    if (logs.length === 0) return 0;

    const totalCigarettes = logs.reduce((sum, log) => sum + log.count, 0);

    // Get unique days with logs
    const uniqueDays = new Set(logs.map((log) => log.date.substring(0, 10)))
      .size;

    return uniqueDays > 0 ? Math.round(totalCigarettes / uniqueDays) : 0;
  };

  const getTrend = () => {
    if (chartData.length < 7) return "neutral";

    const lastWeek = chartData.slice(-7);
    const firstHalf = lastWeek
      .slice(0, 3)
      .reduce((sum, day) => sum + day.count, 0);
    const secondHalf = lastWeek
      .slice(-3)
      .reduce((sum, day) => sum + day.count, 0);

    if (secondHalf < firstHalf) return "down";
    if (secondHalf > firstHalf) return "up";
    return "neutral";
  };

  // Calculate health impacts
  const getHealthImpact = () => {
    const avgPerDay = getAveragePerDay();

    if (avgPerDay < 5) return "low";
    if (avgPerDay < 15) return "medium";
    return "high";
  };

  const trend = getTrend();
  const healthImpact = getHealthImpact();

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {" "}
          {t("cigarett-tracker.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("cigarett-tracker.description")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Track Today's Cigarettes */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("cigarett-tracker.today.title")}</CardTitle>
                <CardDescription>
                  {t("cigarett-tracker.today.subtitle", {
                    date: format(new Date(), "EEEE, dd/MM/yyyy", {
                      locale: vi,
                    }),
                  })}
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Cigarette className="h-4 w-4" />
                <span>{t("cigarett-tracker.today.tracking")}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-center mb-2">
                {todayCount}{" "}
                <span className="text-muted-foreground text-lg">
                  {t("cigarett-tracker.today.unit")}
                </span>
              </div>

              <div className="flex items-center space-x-3 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={todayCount <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <div className="w-16">
                  <Input
                    type="number"
                    min="0"
                    value={todayCount}
                    onChange={handleCountChange}
                    className="text-center"
                  />
                </div>

                <Button variant="outline" size="icon" onClick={handleIncrement}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">
                  {t("cigarett-tracker.today.notes.label")}
                </Label>
                <Input
                  id="notes"
                  placeholder={t("cigarett-tracker.today.notes.placeholder")}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={saveToday}>
              <Save className="mr-2 h-4 w-4" />
              {t("cigarett-tracker.today.save")}
            </Button>
          </CardFooter>
        </Card>

        {/* Statistics */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("cigarett-tracker.stat.title")}</CardTitle>
            <CardDescription>
              {t("cigarett-tracker.stat.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 bg-muted/50 p-4 rounded-md">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t("cigarett-tracker.stat.week")}
                </div>
                <div className="text-2xl font-bold">
                  {getTotalThisWeek()}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {t("cigarett-tracker.today.unit")}
                  </span>
                </div>
              </div>

              <div className="space-y-2 bg-muted/50 p-4 rounded-md">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  {t("cigarett-tracker.stat.avg")}
                </div>
                <div className="text-2xl font-bold">
                  {getAveragePerDay()}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {t("cigarett-tracker.today.unit")}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 bg-muted/50 p-4 rounded-md">
              <div className="text-sm text-muted-foreground">
                {t("cigarett-tracker.trend.label")}
              </div>
              <div className="flex items-center gap-2">
                {trend === "down" && (
                  <>
                    <ArrowDownRight className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">
                      {" "}
                      {t("cigarett-tracker.trend.down")}
                    </span>
                  </>
                )}
                {trend === "up" && (
                  <>
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">
                      {" "}
                      {t("cigarett-tracker.trend.up")}
                    </span>
                  </>
                )}
                {trend === "neutral" && (
                  <>
                    <span className="h-4 w-4">―</span>
                    <span>{t("cigarett-tracker.trend.stable")}</span>
                  </>
                )}
              </div>
            </div>

            <div
              className={`space-y-2 p-4 rounded-md ${
                healthImpact === "high"
                  ? "bg-red-50 text-red-800"
                  : healthImpact === "medium"
                  ? "bg-amber-50 text-amber-800"
                  : "bg-green-50 text-green-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {healthImpact === "high" ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : healthImpact === "medium" ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <Leaf className="h-4 w-4" />
                  )}
                  <span>{t("cigarett-tracker.impact.label")}</span>
                </div>
                <Heart className="h-4 w-4" />
              </div>
              <p className="text-sm">
                {healthImpact === "high"
                  ? t("cigarett-tracker.impact.high")
                  : healthImpact === "medium"
                  ? t("cigarett-tracker.impact.medium")
                  : t("cigarett-tracker.impact.low")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <Card className="col-span-full">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle>{t("cigarett-tracker.chart.title")}</CardTitle>
                <CardDescription>
                  {t("cigarett-tracker.chart.subtitle")}
                </CardDescription>
              </div>
              <Tabs defaultValue="line">
                <TabsList>
                  <TabsTrigger value="line" className="flex items-center gap-1">
                    <LineChartIcon className="h-4 w-4" />
                    <span>{t("cigarett-tracker.chart.line")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="bar" className="flex items-center gap-1">
                    <BarChart2 className="h-4 w-4" />
                    <span>{t("cigarett-tracker.chart.bar")}</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {" "}
            <Tabs defaultValue="line">
              <TabsList className="mb-4">
                <TabsTrigger value="line" className="flex items-center gap-1">
                  <LineChartIcon className="h-4 w-4" />
                  <span>{t("cigarett-tracker.chart.line")}</span>
                </TabsTrigger>
                <TabsTrigger value="bar" className="flex items-center gap-1">
                  <BarChart2 className="h-4 w-4" />
                  <span>{t("cigarett-tracker.chart.bar")}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="line" className="mt-0 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                      domain={[0, "auto"]}
                    />
                    <Tooltip
                      formatter={(value) => [
                        t("cigarett-tracker.chart.tooltip.value", { value }),
                        t("cigarett-tracker.today.unit"),
                      ]}
                      labelFormatter={(label) =>
                        t("cigarett-tracker.chart.tooltip.label", { label })
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name={t("cigarett-tracker.today.unit")}
                      strokeWidth={2}
                      stroke="hsl(var(--primary))"
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="bar" className="mt-0 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip
                      formatter={(value) => [`${value} điếu`, "Số lượng"]}
                      labelFormatter={(label) => `Ngày ${label}`}
                    />
                    <Bar
                      dataKey="count"
                      name={t("cigarett-tracker.today.unit")}
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent History */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>{t("cigarett-tracker.recent.title")}</CardTitle>
            <CardDescription>
              {t("cigarett-tracker.recent.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.length > 0 ? (
                <div className="space-y-2">
                  {logs
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .slice(0, 7)
                    .map((log) => (
                      <div
                        key={log.id}
                        className="flex justify-between items-center p-3 bg-muted/30 rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                            <Cigarette className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {format(parseISO(log.date), "EEEE, dd/MM/yyyy", {
                                locale: vi,
                              })}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {log.notes && log.notes.trim() !== ""
                                ? log.notes
                                : t("cigarett-tracker.notes.none")}
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-bold">
                          {log.count} {t("cigarett-tracker.today.unit")}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <Cigarette className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p>{t("cigarett-tracker.recent.empty")}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
