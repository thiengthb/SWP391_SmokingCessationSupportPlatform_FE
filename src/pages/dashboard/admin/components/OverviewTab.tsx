import { Card, CardContent } from "@/components/ui/card";
import {
  useAdminStatistics,
  useCurrentMonthAdminStatistics,
} from "@/hooks/swr/useTrackingSwr";
import { DollarSign } from "lucide-react";

export function OverviewTab() {
  const { statistics: adminStatistics } = useAdminStatistics();
  const { statistics: currentMonthAdminStatistics } =
    useCurrentMonthAdminStatistics();

  const sortByChronologicalOrder = (
    plans: { name: string; membershipRevenue: number }[]
  ) => {
    const chronologicalOrder = ["Monthly", "Quarterly", "Yearly"];
    return [...plans].sort(
      (a, b) =>
        chronologicalOrder.indexOf(a.name) - chronologicalOrder.indexOf(b.name)
    );
  };

  const sortedPlans = sortByChronologicalOrder(
    adminStatistics.revenueByMembership
  );
  const sortedCurrentMonthPlans = sortByChronologicalOrder(
    currentMonthAdminStatistics.revenueByMembership
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 min-h-[80px]">
              <DollarSign className="h-6 w-6 text-green-600" />
              <div className="flex flex-col justify-center">
                <p className="text-sm text-muted-foreground">
                  Lifetime Month Revenue
                </p>
                <p className="text-2xl font-bold">
                  {adminStatistics.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Revenue by Membership
            </p>
            <div className="space-y-1">
              {sortedPlans.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">
                    ${item.membershipRevenue.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 min-h-[80px]">
              <DollarSign className="h-6 w-6 text-green-600" />
              <div className="flex flex-col justify-center">
                <p className="text-sm text-muted-foreground">
                  Current Month Revenue
                </p>
                <p className="text-2xl font-bold">
                  {currentMonthAdminStatistics.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Revenue by Membership
            </p>
            <div className="space-y-1">
              {sortedCurrentMonthPlans.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">
                    ${item.membershipRevenue.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
