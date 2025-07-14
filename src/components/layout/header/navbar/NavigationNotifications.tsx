import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import useApi from "@/hooks/useApi";
import type { NotificationResponse } from "@/types/models/notification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslate } from "@/hooks/useTranslate";

export function NavigationNotifications() {
  const { auth } = useAuth();
  const apiWithInterceptor = useApi();
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
  const { tNavbar } = useTranslate();
  useEffect(() => {
    if (!auth?.isAuthenticated) return;
    const fetchNotifications = async () => {
      try {
        const response = await apiWithInterceptor.get("/v1/notifications", {
          params: {
            page: 0,
            size: 5,
            sortBy: "sentAt",
            direction: "DESC",
          },
        });
        const newNotifications: NotificationResponse[] = Array.isArray(
          response.data.result.content
        )
          ? response.data.result.content
          : [];
        setNotifications(newNotifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, [auth]);

  if (!auth?.isAuthenticated) return null;

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
          <DropdownMenuItem>
            {tNavbar("navbar.notifications.empty")}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link
            to="/notifications"
            className="w-full text-center text-primary hover:underline"
          >
            {tNavbar("navbar.notifications.seeMore")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
