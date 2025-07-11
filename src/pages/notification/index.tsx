import { useTranslation } from "react-i18next";
import { BellIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNotificationListSwr } from "@/hooks/swr/useNotificationSwr";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
  const totalPages = pagination.totalPages || 1;
  const maxVisiblePages = 7;
  const [jumpPageInput, setJumpPageInput] = useState("");

  const renderPaginationLinks = () => {
    const pages = [];

    const shouldShowStart = currentPage > 3;
    const shouldShowEnd = currentPage < totalPages - 4;

    // Always show first 2 pages
    for (let i = 0; i < Math.min(2, totalPages); i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (shouldShowStart) {
      pages.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show current page if it's not at the very ends
    if (currentPage > 1 && currentPage < totalPages - 2) {
      pages.push(
        <PaginationItem key="current-middle">
          <PaginationLink isActive>{currentPage + 1}</PaginationLink>
        </PaginationItem>
      );
    }

    if (shouldShowEnd) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last 2 pages
    for (let i = Math.max(totalPages - 2, 2); i < totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  const handleJumpToPage = () => {
    const num = parseInt(jumpPageInput, 10);
    if (!isNaN(num) && num > 0 && num <= totalPages) {
      handlePageChange(num - 1);
      setJumpPageInput("");
    }
  };


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

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage <= 0 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {renderPaginationLinks()}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage + 1 >= totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>

          {totalPages > 5 && (
            <div className="mt-4 flex items-center gap-2">
              <Input
                type="number"
                placeholder="Jump to page"
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                className="w-24 h-8 px-2 py-1 text-sm"
                min={1}
                max={totalPages}
              />
              <Button size="sm" onClick={handleJumpToPage}>
                Go
              </Button>
            </div>
          )}
        </Pagination>
      </Card>
    </div>
  );
}
