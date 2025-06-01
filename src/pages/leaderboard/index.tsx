import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Medal, Trophy, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { LeaderboardTabs } from "./components/LeaderboardTabs";
import { leaderboardData } from "./data";

export default function LeaderboardPage() {
  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("");
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <span className="font-bold">{rank}</span>;
    }
  };

  return (
    <div className="container py-10 px-4 mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top achievers in their smoke-free journey
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/leaderboard/hall-of-fame">Hall of Fame</Link>
        </Button>
      </div>

      <LeaderboardTabs />

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {leaderboardData.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(user.rank)}
                </div>
                
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.smokeFreeDay} days smoke-free
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{user.score} pts</div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">{user.badge}</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={user.progress} className="h-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
