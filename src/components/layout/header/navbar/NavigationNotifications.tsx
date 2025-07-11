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
import { Skeleton } from "@/components/ui/skeleton";

export function NavigationNotifications() {
  const { auth } = useAuth();

  const { notifications, isLoading, error } = useNotificationListSwr(
    auth,
    0,
    5
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Inbox className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, idx) => (
              <DropdownMenuItem key={idx} className="flex flex-col gap-1 py-2">
                <Skeleton className="w-48 h-3 rounded" />
                <Skeleton className="w-32 h-2 rounded" />
              </DropdownMenuItem>
            ))}
          </>
        ) : error ? (
          <DropdownMenuItem className="text-red-500">
            Failed to load
          </DropdownMenuItem>
        ) : notifications.length > 0 ? (
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

        {!isLoading && (
          <DropdownMenuItem asChild>
            <Link
              to={Paths.ACCOUNT.NOTIFICATION}
              className="w-full text-center text-primary hover:underline"
            >
              See more
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
