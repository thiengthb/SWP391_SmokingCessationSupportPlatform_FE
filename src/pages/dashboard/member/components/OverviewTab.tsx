import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Cigarette, DollarSign, Trophy } from "lucide-react";
import { stats, achievements, healthTimeline } from "@/utils/mockdata/member";
import { useTranslate } from "@/hooks/useTranslate";
import { useCurrentMonthMemberStatistics, useMemberStatistics } from "@/hooks/swr/useTrackingSwr";

export function OverviewTab() {
  const { tMember } = useTranslate();

  const { statistics } = useMemberStatistics();

  const { statistics: currentMonthStatistics } = useCurrentMonthMemberStatistics();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-2xl font-bold">
        Lifetime Stats
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Average Cigarettes per Day */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Cigarette className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Cigarettes/Day</p>
                <p className="text-2xl font-bold">
                  {statistics.avgCigarettesPerDay.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Days Tracked */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Days Tracked</p>
                <p className="text-2xl font-bold">
                  {statistics.daysTracked}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Cigarettes Avoided</p>
                <p className="text-2xl font-bold">
                  {statistics.cigarettesAvoided}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Money Saved</p>
                <p className="text-2xl font-bold">
                {statistics.moneySaved}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h1 className="text-2xl font-bold">
        Current Month Stats
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Month Statistics*/}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Cigarette className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Current Month Avg Cigarettes/Day</p>
                <p className="text-2xl font-bold">
                  {currentMonthStatistics.avgCigarettesPerDay.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Current Month Days Tracked</p>
                <p className="text-2xl font-bold">
                  {currentMonthStatistics.daysTracked}
                </p>
              </div>
            </div>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}
