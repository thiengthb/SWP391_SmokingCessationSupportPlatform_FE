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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import StarRatingDisplay from "@/pages/feedback/components/StarRatingDisplay";

export type Feedback = {
  id: string;
  username: string;
  comment: string;
  rating: number;
  feedbackType: "SYSTEM" | "IMPROVEMENT" | "MEMBERSHIP" | "STORY" | "OTHERS";
};

export default function FeedbackManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const size = 10;

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const response = await api.get(`/v1/feedback?page=${page}&size=${size}&direction=ASC`);
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
      setOpenDelete(false);

      const response = await api.get(`/v1/feedback?page=${page}&size=${size}&direction=ASC`);
      const { content, totalElements } = response.data.result;
      setFeedbacks(content || []);
      setTotalPages(Math.ceil(totalElements / size) || 1);

      toast.success("Delete successful");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Unable to delete comment. Please try again.");
    }
  };

  const truncateString = (str?: string, maxLength = 50): string => {
    if (!str) return "";
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  const generatePageNumbers = (current: number, total: number): (number | "...")[] => {
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
  };

  return (
    <div className="container py-6 space-y-6 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Feedback Management</h1>
          <p className="text-muted-foreground">Manage user feedback submissions</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead className="w-1/5">Username</TableHead>
                <TableHead className="w-2/5">Comment</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="w-16 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks?.map((fb, index) => (
                <TableRow key={fb.id} className="group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b cursor-pointer">
                  <TableCell className="text-center py-4">{page * size + index + 1}</TableCell>
                  <TableCell className="py-4" onClick={() => setSelectedFeedback(fb)}>
                    {truncateString(fb.username, 20)}
                  </TableCell>
                  <TableCell className="py-4" title={fb.comment} onClick={() => setSelectedFeedback(fb)}>
                    {truncateString(fb.comment)}
                  </TableCell>
                  <TableCell className="py-4" onClick={() => setSelectedFeedback(fb)}>
                    <div className="flex justify-center">
                      <StarRatingDisplay value={fb.rating} />
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center" onClick={() => setSelectedFeedback(fb)}>
                    <span className="uppercase text-sm text-muted-foreground">{fb.feedbackType}</span>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                      onClick={() => {
                        setSelectedId(fb.id);
                        setOpenDelete(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={selectedFeedback !== null} onOpenChange={() => setSelectedFeedback(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Feedback Details</DialogTitle>
                <DialogDescription>View detailed feedback information</DialogDescription>
              </DialogHeader>
              {selectedFeedback && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-1">
                    <span className="text-sm font-medium">UserName:</span>
                    <p className="text-sm break-all">{selectedFeedback.username}</p>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-sm font-medium">Comment:</span>
                    <p className="text-sm whitespace-pre-wrap break-words overflow-auto max-h-[300px]">
                      {selectedFeedback.comment}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium min-w-[60px]">Rating:</span>
                    <StarRatingDisplay value={selectedFeedback.rating} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium min-w-[60px]">Type:</span>
                    <span className="uppercase text-sm text-muted-foreground">
                      {selectedFeedback.feedbackType}
                    </span>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 0 && setPage(page - 1)}
                  className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                  onClick={() => page < totalPages - 1 && setPage(page + 1)}
                  className={page >= totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this comment?</AlertDialogTitle>
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
