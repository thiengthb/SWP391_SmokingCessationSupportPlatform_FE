import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Video, CalendarDays } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

// Example appointments data
const appointments = [
  {
    date: new Date(2025, 6, 1),
    sessions: [
      { time: "10:00", clientName: "John Doe", status: "confirmed" },
      { time: "14:30", clientName: "Jane Smith", status: "pending" },
    ],
  },
  {
    date: new Date(2025, 6, 2),
    sessions: [
      { time: "11:00", clientName: "Mike Johnson", status: "confirmed" },
      { time: "16:00", clientName: "Sarah Wilson", status: "confirmed" },
    ],
  },
  {
    date: new Date(2025, 6, 3),
    sessions: [
      { time: "09:30", clientName: "Alex Brown", status: "confirmed" },
      { time: "13:00", clientName: "Emma Davis", status: "pending" },
      { time: "15:30", clientName: "Chris Martin", status: "confirmed" },
    ],
  },
  {
    date: new Date(2025, 6, 1),
    sessions: [
      { time: "10:00", clientName: "Linda Chen", status: "confirmed" },
      { time: "14:00", clientName: "Tom Wilson", status: "confirmed" },
    ],
  },
  {
    date: new Date(2025, 6, 5),
    sessions: [
      { time: "11:30", clientName: "Maria Garcia", status: "pending" },
      { time: "15:00", clientName: "David Kim", status: "confirmed" },
      { time: "17:30", clientName: "Sophie Lee", status: "confirmed" },
    ],
  },
  {
    date: new Date(2025, 6, 6),
    sessions: [
      { time: "09:00", clientName: "James Taylor", status: "confirmed" },
      { time: "13:30", clientName: "Rachel Green", status: "pending" },
    ],
  },
];

export function ScheduleTab() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayAppointments = appointments.find(
    (app) => app.date.toDateString() === date?.toDateString()
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <CalendarDays className="h-5 w-5" />
          Schedule
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            DayContent: ({ date }) => {
              const hasAppointments = appointments.some(
                (app) => app.date.toDateString() === date.toDateString()
              );
              return (
                <div className="relative">
                  <div>{date.getDate()}</div>
                  {hasAppointments && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </div>
              );
            },
          }}
        />
      </div>

      <div className="md:pt-12 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {date ? format(date, "MMMM d, yyyy") : "No date selected"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDayAppointments ? (
              selectedDayAppointments.sessions.map((session, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{session.clientName}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {session.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        session.status === "confirmed" ? "default" : "secondary"
                      }
                    >
                      {session.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No appointments scheduled for this day
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
