import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Medal, Award } from "lucide-react";
import { useWebSocket } from "@/contexts/WebSocketContext";
import type { ScoreResponse } from "@/types/models/leaderboard";
import { Separator } from "@radix-ui/react-separator";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";
import { useLeaderboardListSwr } from "@/hooks/swr/useLeaderboardSwr";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardList() {
  const [topScores, setTopScores] = useState<ScoreResponse[]>([]);
  const [myScore, setMyScore] = useState<ScoreResponse | null>(null);
  const { leaderboardData, subscribeToTopic } = useWebSocket();
  const { auth } = useAuth();
  const { scores, error, isLoading } = useLeaderboardListSwr();

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const handleScores = (scores: ScoreResponse[]) => {
    const top10 = scores.slice(0, 10);
    const myScore = scores[10]; //current user

    setTopScores(top10);

    if (myScore) {
      setMyScore(myScore);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="font-bold">#{rank}</span>;
    }
  };

  useEffect(() => {
    if (scores.length > 0) {
      handleScores(scores);
    }
  }, [scores]);

  useEffect(() => {
    if (leaderboardData?.length > 0) {
      handleScores(leaderboardData);
    }
  }, [leaderboardData]);

  useEffect(() => {
    const unsubscribe = subscribeToTopic("/topic/leaderboard", (body) => {
      const updatedScores: ScoreResponse[] = JSON.parse(body);
      handleScores(updatedScores);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Top 10 */}
      {[...Array(10)].map((_, index) => {
        const user = topScores[index];
        const isCurrentUser = user?.username === auth.currentAcc?.username;

        return (
          <Card
            key={user?.username ?? `skeleton-${index}`}
            className={clsx(
              "p-4 transition-all duration-300",
              isCurrentUser && "border-2 border-primary bg-muted"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-3 text-center">
                {user ? getRankIcon(user.score_rank) : <Skeleton className="w-4 h-4 rounded-full" />}
              </div>

              {user ? (
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                </Avatar>
              ) : (
                <Skeleton className="w-10 h-10 rounded-full" />
              )}

              <div className="flex-1">
                {user ? (
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{user.username}</h3>
                    <div className="flex items-center gap-2 text-right">
                      <div className="font-bold">{user.score} pts</div>
                      <Award className="h-4 w-4 text-primary relative top-[1px]" />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-12 h-4" />
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
      {/* My Score */}
      {myScore && (
        <>
        <div className="relative">
            <Separator className="my-8" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground text-sm">
              Your Ranking
            </span>
          </div>
        <Card className="p-4 border-2 border-primary bg-muted">
          <div className="flex items-center gap-4">
            <div className="w-3 text-center">
              {getRankIcon(myScore.score_rank)}
            </div>
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
        </>
      )}
    </div>
  );
}
