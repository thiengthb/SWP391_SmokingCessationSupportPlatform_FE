import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, startOfDay, parseISO, differenceInMinutes } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar"; // ✅ your original calendar component
import { useCoachBookingsSwr } from "@/hooks/swr/useBookingSwr";

export default function ScheduleTab() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { bookings = [], isLoading } = useCoachBookingsSwr();

  const dateStart = startOfDay(selectedDate);

  const dayBookings = useMemo(
    () =>
      bookings.filter(
        (b) =>
          new Date(b.startedAt).toDateString() === selectedDate.toDateString()
      ),
    [bookings, selectedDate]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {/* Left: Calendar Picker */}
      <div className="w-full lg:w-auto">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
        />
      </div>

      {/* Right: Schedule Timeline */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Schedule for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[800px]">
          <div className="relative h-[1440px] border-l bg-muted">
            {/* Hour lines and time labels */}
            {Array.from({ length: 24 }).map((_, hour) => (
              <div
                key={hour}
                className="absolute w-full border-t text-xs text-muted-foreground"
                style={{ top: `${hour * 60}px` }}
              >
                <div className="ml-2 w-16">{`${hour
                  .toString()
                  .padStart(2, "0")}:00`}</div>
              </div>
            ))}

            {/* Booking blocks */}
            {dayBookings.map((booking, index) => {
              const start = parseISO(booking.startedAt);
              const end = parseISO(booking.endedAt);
              const offset = differenceInMinutes(start, dateStart);
              const duration = differenceInMinutes(end, start);

              const colors = [
                "bg-blue-500",
                "bg-green-500",
                "bg-pink-500",
                "bg-yellow-500",
                "bg-purple-500",
                "bg-orange-500",
                "bg-rose-500",
              ];
              const bgColor = colors[index % colors.length];

              return (
                <div
                  key={booking.id}
                  className={`absolute left-20 right-4 text-white rounded px-2 py-1 shadow-md ${bgColor}`}
                  style={{
                    top: `${offset}px`,
                    height: `${duration}px`,
                  }}
                >
                  <div className="text-sm font-semibold">
                    Client: {booking.memberName}
                  </div>
                  <div className="text-xs">
                    {format(start, "HH:mm")} - {format(end, "HH:mm")}
                  </div>
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                    className="mt-1"
                  >
                    {booking.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
