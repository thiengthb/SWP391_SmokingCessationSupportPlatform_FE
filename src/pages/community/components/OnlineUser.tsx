import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Account } from "@/types/models/account";
import { useTranslate } from "@/hooks/useTranslate";
import { UserRound } from "lucide-react";

interface OnlineUserProps {
  user: Account;
}

export function OnlineUser({ user }: OnlineUserProps) {
  const { tCommunity } = useTranslate();

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
      <div className="relative">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>
            <UserRound className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <span
          className={cn(
            "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background",
            user.status === "ONLINE" ? "bg-green-500" : "bg-yellow-500"
          )}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium leading-none">
          {user.username}
        </span>
        <span className="text-xs text-muted-foreground">
          {user.status === "ONLINE"
            ? tCommunity("community.activeNow")
            : tCommunity("community.away")}
        </span>
      </div>
    </div>
  );
}
