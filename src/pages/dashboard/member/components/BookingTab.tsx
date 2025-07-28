import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { type Booking } from "@/types/coach/Booking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { toast } from "sonner";

export function BookingsTab() {
  const api = useApi();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 5;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get(
          `/v1/bookings/member-booking?page=${page}&size=${size}&direction=ASC&sortBy=startedAt`
        );
        const { content, totalElements } = res.data.result;

        setBookings(content || []);
        setTotalPages(
          totalElements === 0 ? 0 : Math.ceil(totalElements / size)
        );
      } catch (error) {
        console.error("Error fetching member bookings", error);
        toast.error("Failed to load bookings");
      }
    };

    fetchBookings();
  }, [page]);

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  const generatePageNumbers = (
    current: number,
    total: number
  ): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current > 3) pages.push(1, "...");
      const start = Math.max(1, current - 1);
      const end = Math.min(total, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 2) pages.push("...", total);
      else if (!pages.includes(total)) pages.push(total);
    }

    return pages;
  };

  return (
    <div className="container py-6 space-y-6 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coach</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Meet Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No Bookings Found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    className="hover:bg-muted transition-colors"
                  >
                    <TableCell>{booking.coachId}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>
                      {format(new Date(booking.startedAt), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.endedAt), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      {booking.meetLink ? (
                        <a
                          href={booking.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Join
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {bookings.length > 0 && totalPages > 1 && (
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
                  {generatePageNumbers(page + 1, totalPages).map(
                    (item, index) => (
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
                    )
                  )}
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
        </CardContent>
      </Card>
    </div>
  );
}
