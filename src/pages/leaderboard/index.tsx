import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Medal, Award, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { ScoreResponse } from "@/types/leaderboard/index";
import useApi from "@/hooks/useApi";
import { Separator } from "@radix-ui/react-separator";

export default function LeaderboardPage() {
  const { t } = useTranslation();
  const [score, setScore] = useState<ScoreResponse[]>([]);
  const [myScore, setMyScore] = useState<ScoreResponse | null>(null);
  const apiWithInterceptor = useApi();
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="font-bold">{rank}</span>;
    }
  };

  const fetchMyScore = async () => {
    try {
      const response = await apiWithInterceptor.get(`/v1/scores/me`);
      console.log("Fetched my score:", response.data);
      const myScore: ScoreResponse = response.data.result;
      if (myScore) {
        setMyScore(myScore);
      }
    } catch (error) {
      console.error("Failed to fetch my score:", error);
    }
  }

  const fetchScores = async () => {
    try {
      const response = await apiWithInterceptor.get(`/v1/scores`);
      console.log("Fetched scores:", response.data);
      const newScores: ScoreResponse[] = Array.isArray(response.data.result)
        ? response.data.result
        : [];
      setScore(newScores);
    } catch (error) {
      console.error("Failed to fetch scores:", error);
    }
  }

  useEffect(() => {
    fetchScores();
    fetchMyScore();
  }, []);

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


      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="space-y-4">
            {score.map((user, index) => {
              const rank = index + 1;
              return (
                <Card key={user.username} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-3 text-center">
                      {getRankIcon(rank)}
                    </div>
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{user.username}</h3>

                        <div className="flex items-center gap-2 text-right">
                          <div className="font-bold">{user.score} pts</div>
                          <Award className="h-4 w-4 text-primary relative top-[1px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Separator with label */}
          <div className="relative">
            <Separator className="my-8" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground text-sm">
              Your Ranking
            </span>
          </div>

          {/* Current User Section */}
          {myScore && (
            <Card className="p-4 border-2 border-primary">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={myScore.avatar} />
                  <AvatarFallback>{getInitials(myScore.username)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{myScore.username}</h3>

                    <div className="flex items-center gap-2 text-right">
                      <div className="font-bold">{myScore.score} pts</div>
                      <Award className="h-4 w-4 text-primary relative top-[1px]" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
