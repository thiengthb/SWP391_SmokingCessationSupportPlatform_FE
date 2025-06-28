import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Plus } from "lucide-react";
import { goals } from "@/utils/mockdata/member";
import { useTranslation } from "react-i18next";

export function GoalsTab() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t("page.memberdashboard.goals.title")}</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t(goal.title)}</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{t(goal.description)}</p>
                <Progress value={goal.progress} />
                <p className="text-xs text-muted-foreground text-right">{t(goal.target)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
