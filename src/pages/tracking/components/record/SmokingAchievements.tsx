import { Card, CardContent } from "@/components/ui/card";
import { Activity, Calendar, Cigarette } from "lucide-react";
import { useMemberStatistics } from "@/hooks/swr/useTrackingSwr";
export function SmokingAchievements() {

  const { statistics, isLoading } = useMemberStatistics();

  return (
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
    </div>
  );
}

export default SmokingAchievements;
