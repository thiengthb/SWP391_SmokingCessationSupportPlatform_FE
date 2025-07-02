import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StarRatingDisplay from "@/pages/feedback/components/StarRatingDisplay";
import { Trash2 } from "lucide-react";

export type Feedback = {
  id: string;
  username: string;
  comment: string;
  rating: number;
};

export function FeedbackTab({
  feedbacks,
  page,
  size,
  onRequestDelete,
}: {
  feedbacks: Feedback[];
  page: number;
  size: number;
  onRequestDelete?: (id: string) => void;
}) {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );

  const truncateString = (str?: string, maxLength: number = 50): string => {
    if (!str) return "";
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  const handleRowClick = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleCloseModal = () => {
    setSelectedFeedback(null);
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-16 text-center font-semibold text-gray-700 dark:text-gray-200">#</TableHead>
              <TableHead className="w-1/4 font-semibold text-gray-700 dark:text-gray-200">Username</TableHead>
              <TableHead className="w-1/2 font-semibold text-gray-700 dark:text-gray-200">Comment</TableHead>
              <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-200">Rating</TableHead>
              <TableHead className="w-16 text-center font-semibold text-gray-700 dark:text-gray-200">Actions</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks?.map((fb, index) => (
              <TableRow
                key={fb.id}
                className="group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b cursor-pointer"
              >
                <TableCell className="text-center py-4">
                  {page * size + index + 1}
                </TableCell>
                <TableCell
                  className="py-4 cursor-pointer"
                  onClick={() => handleRowClick(fb)}
                >
                  {truncateString(fb.username, 20)}
                </TableCell>
                <TableCell
                  className="py-4 cursor-pointer"
                  title={fb.comment}
                  onClick={() => handleRowClick(fb)}
                >
                  {truncateString(fb.comment)}
                </TableCell>
                <TableCell
                  className="py-4 cursor-pointer"
                  onClick={() => handleRowClick(fb)}
                >
                  <div className="flex justify-center items-center">
                    <StarRatingDisplay value={fb.rating} />
                  </div>
                </TableCell>
                <TableCell className="text-center py-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                    onClick={() => onRequestDelete?.(fb.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={selectedFeedback !== null}
          onOpenChange={handleCloseModal}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Feedback Details</DialogTitle>
              <DialogDescription>
                View detailed feedback information
              </DialogDescription>
            </DialogHeader>
            {selectedFeedback && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-1">
                  <span className="text-sm font-medium">UserName:</span>
                  <p className="text-sm break-all">
                    {selectedFeedback.username}
                  </p>
                </div>
                <div className="grid gap-1">
                  <span className="text-sm font-medium">Comment:</span>
                  <p className="text-sm whitespace-pre-wrap break-words overflow-auto max-h-[300px]">
                    {selectedFeedback.comment}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium min-w-[60px]">
                    Rating:
                  </span>
                  <StarRatingDisplay value={selectedFeedback.rating} />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

