import { Card, CardContent } from "@/components/ui/card";
import { Activity, Calendar, Cigarette } from "lucide-react";

export function SmokingAchievements() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Reports</p>
              <p className="text-2xl font-bold">20</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Cigarette className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-muted-foreground">
                Avg Cigarettes/Day
              </p>
              <p className="text-2xl font-bold">20</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-muted-foreground">Days Tracked</p>
              <p className="text-2xl font-bold">30</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SmokingAchievements;
