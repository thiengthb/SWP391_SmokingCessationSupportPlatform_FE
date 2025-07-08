import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { NotificationResponse } from "@/types/models/notification";
import useApi from "@/hooks/useApi";
import { BellIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function NotificationPage() {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiWithInterceptor = useApi();

  const fetchNotifications = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await apiWithInterceptor.get(`/v1/notifications`, {
        params: {
          page: pageNumber,
          size: PAGE_SIZE,
          sortBy: "sentAt",
          direction: "DESC",
        },
      });
      console.log("Fetched notifications:", response.data);

      const newNotifications: NotificationResponse[] = Array.isArray(
        response.data.result.content
      )
        ? response.data.result.content
        : [];

      setNotifications(newNotifications);
      setTotalPages(response.data.result?.totalPages || 0);
      setPage(pageNumber);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(0);
  }, []);

  return (
    <div className="container py-10 px-4 mx-auto">
      <div className="mb-6 space-y-1">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <BellIcon className="h-6 w-6" />
          {t("page.notifications.title", "Notifications")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            "page.notifications.description",
            "Stay informed about your goals and achievements."
          )}
        </p>
      </div>

      <Card className="p-4">
        {loading ? (
          <div className="space-y-3">
            {t("page.notifications.loading", "Loading notifications...")}
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500 text-center">
            {t("page.notifications.empty", "No notifications yet.")}
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={clsx(
                  "p-3 rounded-md border transition-colors",
                  !notification.isRead
                    ? "bg-gray-100 text-black border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                    : "bg-gray-200 text-gray-500 border-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700"
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p>{notification.content}</p>
                    <p className="text-sm">
                      {t("page.notifications.type")}:{" "}
                      {notification.notificationType}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {new Date(notification.sentAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <Button
            onClick={() => fetchNotifications(page - 1)}
            disabled={page <= 0}
            variant="outline"
          >
            {t("page.notifications.prev", "Previous")}
          </Button>

          <span className="text-sm text-gray-600">
            {t("page.notifications.page", "Page")} {page + 1} /{" "}
            {totalPages || 1}
          </span>

          <Button
            onClick={() => fetchNotifications(page + 1)}
            disabled={page + 1 >= totalPages}
            variant="outline"
          >
            {t("page.notifications.next", "Next")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
