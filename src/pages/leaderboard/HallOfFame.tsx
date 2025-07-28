import { Badge } from "../../components/ui/badge";
import { Trophy, Star } from "lucide-react";
import { Card } from "../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { useHallOfFameSwr } from "@/hooks/swr/useHallOfFameSwr";
import { format } from "date-fns";
import { useTranslate } from "@/hooks/useTranslate";

export default function HallOfFamePage() {
  const { tLeaderboard } = useTranslate();
  const { hallOfFame } = useHallOfFameSwr();

  return (
    <div className="container py-10 px-4 mx-auto">
      <div className="text-center mb-10">
        <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">
          {tLeaderboard("leaderboard.hallOfFame.title")}
        </h1>
        <p className="text-muted-foreground">
          {tLeaderboard("leaderboard.hallOfFame.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {hallOfFame.map((champion) => (
          <Card
            key={champion.account.username}
            className="p-6 text-center flex-col items-center"
          >
            <div className="flex flex-col items-center gap-y-2 w-full">
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarImage src={champion.account.avatar} />
                <AvatarFallback>
                  {champion.account.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">{champion.account.username}</h3>
              <div className="flex gap-x-2">
                <Badge>{champion.criteriaType}</Badge>
                <Badge variant="secondary">{champion.criteriaValue}</Badge>
              </div>
              <div className="flex flex-col items-center text-sm text-muted-foreground">
                <span>{champion.description}</span>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="h-4 w-4" />
                  <span>
                    {champion.timestamp
                      ? format(new Date(champion.timestamp), "dd/MM/yyyy")
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
