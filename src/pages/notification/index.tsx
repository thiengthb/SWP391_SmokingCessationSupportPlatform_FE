import { useTranslation } from "react-i18next";
import { BellIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotificationListSwr } from "@/hooks/swr/useNotificationSwr";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "react-router-dom";

export default function NotificationPage() {
  const { t } = useTranslation();
  const { auth } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "0", 10);

  const {
    notifications,
    pagination,
    isLoading,
    error,
  } = useNotificationListSwr(auth, currentPage, 10);


  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="container py-10 px-4 mx-auto">
      <div className="mb-6 space-y-1">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <BellIcon className="h-6 w-6" />
          {t("page.notifications.title", "Notifications")}
        </h1>
        <p className="text-muted-foreground">
          {t("page.notifications.description", "Stay informed about your goals and achievements.")}
        </p>
      </div>

      <Card className="p-4">
        {isLoading ? (
          <div className="space-y-3">
            {t("page.notifications.loading", "Loading notifications...")}
          </div>
        ) : error ? (
          <p className="text-red-600">{t("page.notifications.error", "Failed to fetch notifications.")}</p>
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
                      {t("page.notifications.type")}: {notification.notificationType}
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
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 0}
            variant="outline"
          >
            {t("page.notifications.prev", "Previous")}
          </Button>

          <span className="text-sm text-gray-600">
            {t("page.notifications.page", "Page")} {currentPage + 1} /{" "}
            {pagination.totalPages || 1}
          </span>

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage + 1 >= (pagination.totalPages ?? 1)}
            variant="outline"
          >
            {t("page.notifications.next", "Next")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
