import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Feedback = {
  id: string;
  accountId: string;
  comment: string;
  rating: number;
};

export function FeedbackTab({
  feedbacks,
  page,
  size,
}: {
  feedbacks: Feedback[];
  page: number;
  size: number;
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              <TableHead>Account ID</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks?.map((fb, index) => (
              <TableRow key={fb.id}>
                <TableCell className="text-center">
                  {page * size + index + 1}
                </TableCell>
                <TableCell>{fb.accountId}</TableCell>
                <TableCell className="max-w-xs truncate">{fb.comment}</TableCell>
                <TableCell>{fb.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
