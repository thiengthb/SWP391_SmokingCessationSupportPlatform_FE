import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Medal, Trophy, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { LeaderboardTabs } from "./components/LeaderboardTabs";
import { leaderboardData } from "./data";
import { Separator } from "@/components/ui/separator";

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

  // Simulate current user - replace with actual auth user data
  const currentUser = {
    id: "current-user",
    name: "You",
    rank: 24,
    score: 450,
    smokeFreeDay: 15,
    badge: "Bronze",
    achievement: "Getting Started",
    progress: 45,
    avatar: "", // Add avatar property, set to empty string or a valid image URL
  };

  const topTenUsers = leaderboardData.slice(0, 10);

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
          {/* Top 10 Section */}
          <div className="space-y-4">
            {topTenUsers.map((user) => (
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

          {/* Separator with label */}
          <div className="relative">
            <Separator className="my-8" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground text-sm">
              Your Ranking
            </span>
          </div>

          {/* Current User Section */}
          <Card className="p-4 border-2 border-primary">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12">
                <span className="font-bold">#{currentUser.rank}</span>
              </div>
              
              <Avatar>
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-primary">{currentUser.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentUser.smokeFreeDay} days smoke-free
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{currentUser.score} pts</div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm">{currentUser.badge}</span>
                    </div>
                  </div>
                </div>
                <Progress value={currentUser.progress} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
