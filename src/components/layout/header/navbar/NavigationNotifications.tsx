import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Paths } from "@/constants/path";
import { useNotificationListSwr } from "@/hooks/swr/useNotificationSwr";

export function NavigationNotifications() {
  const { auth } = useAuth();
  if (!auth?.isAuthenticated) return null;

  const { notifications } = useNotificationListSwr(auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Inbox className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <DropdownMenuItem key={n.id} className="flex flex-col items-start">
              <span className="font-medium line-clamp-1">{n.content}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(n.sentAt).toLocaleString()}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link
            to={Paths.ACCOUNT.NOTIFICATION}
            className="w-full text-center text-primary hover:underline"
          >
            See more
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
