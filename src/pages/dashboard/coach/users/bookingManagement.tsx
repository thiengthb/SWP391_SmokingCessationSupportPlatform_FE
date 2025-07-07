import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import { format } from "date-fns";
import { toast } from "sonner";
import { type Booking } from "@/types/coach/Booking";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 5;

  const api = useApi();

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await api.get(
          `/v1/bookings/coach-booking?page=${page}&size=${size}&direction=ASC`
        );
        const { content, totalElements } = response.data.result;
        const pendingBookings = (content || []).filter(
          (b: Booking) => b.status === "PENDING"
        );
        setBookings(pendingBookings);
        setTotalPages(
          totalElements === 0 ? 0 : Math.ceil(totalElements / size)
        );
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Failed to load bookings.");
      }
    };

    getBookings();
  }, [refreshKey, page]);

  const handleAccept = async (id: string) => {
    try {
      await api.put(`/v1/bookings/answer/${id}`, {
        accepted: true,
      });

      toast.success("Booking accepted.");
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Accept failed:", error);
      toast.error("Failed to accept booking.");
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await api.put(`/v1/bookings/answer/${id}`, {
        accepted: false,
        declineReason: "Declined by coach",
      });
      toast("Booking declined.");
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Decline failed:", error);
      toast.error("Failed to decline booking.");
    }
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
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
          <CardTitle>Member Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member ID</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No bookings available
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    className="hover:bg-muted transition-colors"
                  >
                    <TableCell>{booking.memberId}</TableCell>
                    <TableCell>
                      {format(new Date(booking.startedAt), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.endedAt), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        onClick={() => handleAccept(booking.id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow hover:shadow-md"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleDecline(booking.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold transition-all shadow hover:shadow-md"
                      >
                        Decline
                      </Button>
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
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
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
