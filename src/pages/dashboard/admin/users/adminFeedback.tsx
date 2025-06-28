import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useApi from "@/hooks/useApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Feedback } from "../components/FeedbackTab";
import { FeedbackTab } from "../components/FeedbackTab";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function FeedbackManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const size = 10;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const response = await api.get(
          `/v1/feedback?page=${page}&size=${size}&direction=ASC`
        );
        const { content, totalElements } = response.data.result;
        setFeedbacks(content || []);
        setTotalPages(Math.ceil(totalElements / size) || 1);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
        navigate("/auth/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }
    };

    getFeedbacks();
  }, [page]);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await api.delete(`/v1/feedback/${selectedId}`);
      setSelectedId(null);
      setOpen(false);

      const response = await api.get(
        `/v1/feedback?page=${page}&size=${size}&direction=ASC`
      );
      const { content, totalElements } = response.data.result;
      setFeedbacks(content || []);
      setTotalPages(Math.ceil(totalElements / size) || 1);

      toast.success("Xoá thành công");
    } catch (error) {
      console.error("Xoá thất bại:", error);
      toast.error("Không thể xoá phản hồi. Vui lòng thử lại.");
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  function generatePageNumbers(
    current: number,
    total: number
  ): (number | "...")[] {
    const pages: (number | "...")[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current > 3) pages.push(1, "...");
      const start = Math.max(1, current - 1);
      const end = Math.min(total, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 2) {
        pages.push("...", total);
      } else if (!pages.includes(total)) {
        pages.push(total);
      }
    }

    return pages;
  }

  return (
    <div className="container py-6 space-y-6 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Feedback Management
          </h1>
          <p className="text-muted-foreground">
            Manage user feedback submissions
          </p>
        </div>
      </div>

      <FeedbackTab
        feedbacks={feedbacks}
        page={page}
        size={size}
        onRequestDelete={(id) => {
          setSelectedId(id);
          setOpen(true);
        }}
      />

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevious}
                  className={
                    page === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {generatePageNumbers(page + 1, totalPages).map((item, index) => (
                <PaginationItem key={index}>
                  {item === "..." ? (
                    <span className="px-2 text-muted-foreground">...</span>
                  ) : (
                    <PaginationLink
                      isActive={item === page + 1}
                      onClick={() => setPage(Number(item) - 1)}
                    >
                      {item}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  className={
                    page >= totalPages - 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this comment ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
