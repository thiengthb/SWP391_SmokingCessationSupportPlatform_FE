import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "../types";

interface OnlineUserProps {
  user: User;
}

export function OnlineUser({ user }: OnlineUserProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
      <div className="relative">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span className={cn(
          "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background",
          user.status === "online" ? "bg-green-500" : "bg-yellow-500"
        )} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium leading-none">{user.name}</span>
        <span className="text-xs text-muted-foreground">
          {user.status === "online" ? "Active now" : "Away"}
        </span>
      </div>
    </div>
  );
}
