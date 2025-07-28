import { Card, CardContent } from "@/components/ui/card";
import { useAdminStatistics } from "@/hooks/swr/useTrackingSwr";
import { DollarSign } from "lucide-react";

export function OverviewTab() {

  const { statistics: adminStatistics, isLoading: isAdminLoading } = useAdminStatistics();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Lifetime Revenue</p>
                <p className="text-2xl font-bold">
                  {adminStatistics.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2">Revenue by Membership</p>
            <div className="space-y-1">
              {adminStatistics.revenueByMembership.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">${item.membershipRevenue.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
