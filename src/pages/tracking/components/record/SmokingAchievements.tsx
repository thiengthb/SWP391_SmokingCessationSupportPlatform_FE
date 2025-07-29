import { Card, CardContent } from "@/components/ui/card";
import { Activity, Calendar, Cigarette } from "lucide-react";
import {
  useCurrentMonthMemberStatistics,
  useMemberStatistics,
} from "@/hooks/swr/useTrackingSwr";
export function SmokingAchievements() {
  const { statistics } = useMemberStatistics();

  const { statistics: currentMonthStatistics } =
    useCurrentMonthMemberStatistics();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Average Cigarettes per Day */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Cigarette className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">TB Điếu/Ngày</p>
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
                <p className="text-sm text-muted-foreground">Ngày Theo Dõi</p>
                <p className="text-2xl font-bold">{statistics.daysTracked}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Month Statistics*/}
      <div>
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">
                  TB Điếu/Ngày Tháng Này
                </p>
                <p className="text-2xl font-bold">
                  {currentMonthStatistics.avgCigarettesPerDay.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Ngày Theo Dõi Tháng Này
                </p>
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

export default SmokingAchievements;
