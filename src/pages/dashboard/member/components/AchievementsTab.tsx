import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Lock, Star } from "lucide-react";
import { achievementCategories } from "@/utils/mockdata/member";

export function AchievementsTab() {
  const totalAchievements = achievementCategories.reduce(
    (acc, cat) => acc + cat.achievements.length,
    0
  );
  const completedAchievements = achievementCategories.reduce(
    (acc, cat) => acc + cat.achievements.filter((a) => a.completed).length,
    0
  );

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Achievement Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress
              value={(completedAchievements / totalAchievements) * 100}
            />
            <span className="text-sm font-medium">
              {completedAchievements}/{totalAchievements}
            </span>
          </div>
        </CardContent>
      </Card>

      {achievementCategories.map((category) => (
        <div key={category.name} className="space-y-4">
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.achievements.map((achievement) => (
              <Card
                key={achievement.title}
                className={!achievement.completed ? "opacity-75" : ""}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {achievement.title}
                  </CardTitle>
                  {achievement.completed ? (
                    <Trophy className="h-4 w-4 text-primary" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  <Progress value={achievement.progress} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
