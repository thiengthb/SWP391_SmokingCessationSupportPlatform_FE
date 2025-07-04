import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LeaderboardList from "./components/LeaderboardList";

export default function LeaderboardPage() {
  const { t } = useTranslation();

  return (
    <div className="container py-10 px-4 mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 />
            <h1 className="text-4xl font-bold mb-2">
              {" "}
              {t("page.leaderboard.title")}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {t("page.leaderboard.description")}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/leaderboard/hall-of-fame">
            {t("page.leaderboard.hallOfFame.button")}
          </Link>
        </Button>
      </div>
      <LeaderboardList />
    </div>
  );
}
