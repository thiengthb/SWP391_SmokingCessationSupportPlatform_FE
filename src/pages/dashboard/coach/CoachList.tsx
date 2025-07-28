import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useApi from "@/hooks/useApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CoachResponse {
  accountId: string;
  id: string;
  fullName: string;
  bio?: string;
  experienceYears: number;
  socialLinks?: string;
  specializations?: string;
  certificates?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function CoachList() {
  const apiWithInterceptor = useApi();
  const [coaches, setCoaches] = useState<CoachResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking dialog state
  const [open, setOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<CoachResponse | null>(null);
  const [bookingReason, setBookingReason] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [endedAt, setEndedAt] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await apiWithInterceptor.get("/v1/coaches?page=0&size=10");
        setCoaches(response.data.result.content || []);
      } catch (error) {
        setCoaches([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, [apiWithInterceptor]);

  const handleBookClick = (coach: CoachResponse) => {
    setSelectedCoach(coach);
    setOpen(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoach) return;
    setBookingLoading(true);
    try {
      await apiWithInterceptor.post("/v1/bookings", {
        coachId: selectedCoach.id,
        startedAt,
        endedAt,
        bookingReason,
      });
      toast.success("Booking request sent!");
      setOpen(false);
      setBookingReason("");
      setStartedAt("");
      setEndedAt("");
    } catch (error) {
      toast.error("Failed to send booking request.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="container py-8 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Coach List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : coaches.length === 0 ? (
        <div>No coaches found.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach) => (
            <Card key={coach.id}>
              <CardHeader className="flex flex-col items-center">
                <CardTitle>{coach.fullName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <span className="font-semibold">Bio:</span> {coach.bio || "N/A"}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Experience:</span> {coach.experienceYears} years
                </div>
                {coach.specializations && (
                  <div className="mb-2">
                    <span className="font-semibold">Specializations:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {coach.specializations
                        .split(",")
                        .map((spec, idx) => (
                          <Badge key={idx} variant="secondary">{spec.trim()}</Badge>
                        ))}
                    </div>
                  </div>
                )}
                {coach.certificates && (
                  <div className="mb-2">
                    <span className="font-semibold">Certificates:</span>
                    <ul className="list-disc ml-5">
                      {coach.certificates
                        .split(",")
                        .map((cert, idx) => (
                          <li key={idx}>{cert.trim()}</li>
                        ))}
                    </ul>
                  </div>
                )}
                {coach.socialLinks && (
                  <div className="mb-2">
                    <span className="font-semibold">Social Links:</span> {coach.socialLinks}
                  </div>
                )}
                <Button className="mt-4 w-full" onClick={() => handleBookClick(coach)}>
                  Book Coach
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {selectedCoach?.fullName}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <Input
              type="datetime-local"
              value={startedAt}
              onChange={(e) => setStartedAt(e.target.value)}
              required
              min={new Date().toISOString().slice(0, 16)}
              placeholder="Start Date & Time"
            />
            <Input
              type="datetime-local"
              value={endedAt}
              onChange={(e) => setEndedAt(e.target.value)}
              required
              min={startedAt || new Date().toISOString().slice(0, 16)}
              placeholder="End Date & Time"
            />
            <Input
              type="text"
              value={bookingReason}
              onChange={(e) => setBookingReason(e.target.value)}
              required
              placeholder="Booking Reason"
            />
            <Button type="submit" disabled={bookingLoading} className="w-full">
              {bookingLoading ? "Booking..." : "Send Booking Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}