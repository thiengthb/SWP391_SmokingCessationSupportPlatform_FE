import { Badge } from "../../components/ui/badge";
import { Trophy, Star } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { champions } from "./hall-of-fame";


export default function HallOfFamePage() {
  return (
    <div className="container py-10 px-4 mx-auto">
      <div className="text-center mb-10">
        <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Hall of Fame</h1>
        <p className="text-muted-foreground">Celebrating our greatest achievers</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {champions.map((champion) => (
          <Card key={champion.name} className="p-6 text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src={champion.avatar} />
              <AvatarFallback>
                {champion.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-lg mb-2">{champion.name}</h3>
            <Badge className="mb-2">{champion.achievement}</Badge>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>{champion.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
