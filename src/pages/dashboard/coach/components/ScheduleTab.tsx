import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Clock, Video } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HOURS = Array.from({ length: 23 }, (_, i) => 1 + i);

interface Session {
  time: string;
  clientName: string;
  status: "confirmed" | "pending";
}

interface Appointment {
  date: Date;
  sessions: Session[];
}

export function ScheduleTab() {
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [openHour, setOpenHour] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>("");
  const [status, setStatus] = useState<"confirmed" | "pending">("pending");

  const selectedDayAppointments = appointments.find(
    (app) => app.date.toDateString() === date.toDateString()
  );

  const handleCreateSession = () => {
    if (!openHour || !clientName) return;

    const newSession: Session = {
      time: openHour,
      clientName,
      status,
    };

    setAppointments((prev) => {
      const existing = prev.find(
        (app) => app.date.toDateString() === date.toDateString()
      );

      if (existing) {
        return prev.map((app) =>
          app.date.toDateString() === date.toDateString()
            ? { ...app, sessions: [...app.sessions, newSession] }
            : app
        );
      } else {
        return [...prev, { date, sessions: [newSession] }];
      }
    });

    setOpenHour(null);
    setClientName("");
    setStatus("pending");
  };

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
      {/* Left - Calendar */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <CalendarDays className="h-5 w-5" />
          Schedule
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && setDate(d)}
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

      {/* Right - Timeline */}
      <div className="md:pt-12 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{format(date, "MMMM d, yyyy")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[650px] overflow-y-auto pr-2">
            {HOURS.map((hour) => {
              const hourStr = `${hour.toString().padStart(2, "0")}:00`;
              const session = selectedDayAppointments?.sessions.find((s) =>
                s.time.startsWith(hourStr)
              );
              const isOpen = openHour === hourStr;

              return (
                <Popover key={hour} open={isOpen} onOpenChange={(open) => setOpenHour(open ? hourStr : null)}>
                  <PopoverTrigger asChild>
                    <div
                      className="border-b py-2 px-1 flex justify-between items-start group cursor-pointer"
                      onClick={() => setOpenHour(hourStr)}
                    >
                      <div className="w-16 text-sm text-muted-foreground">{hourStr}</div>
                      <div className="flex-1 ml-2">
                        {session ? (
                          <div className="p-3 rounded-md border shadow-sm bg-background hover:bg-accent transition-colors">
                            <div className="font-medium">{session.clientName}</div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="mr-1 h-4 w-4" />
                              {session.time}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <Badge
                                variant={
                                  session.status === "confirmed" ? "default" : "secondary"
                                }
                              >
                                {session.status}
                              </Badge>
                              <Button size="icon" variant="outline">
                                <Video className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="h-12 flex items-center text-sm text-muted-foreground group-hover:text-foreground">
                            (Empty)
                          </div>
                        )}
                      </div>
                    </div>
                  </PopoverTrigger>

                  {!session && (
                    <PopoverContent className="w-[300px]">
                      <div className="text-base font-semibold mb-2">
                        Create New Session - {hourStr}
                      </div>
                      <div className="space-y-4">
                        <Input
                          placeholder="Client Name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                        />
                        <select
                          className="w-full p-2 border rounded-md"
                          value={status}
                          onChange={(e) =>
                            setStatus(e.target.value as "confirmed" | "pending")
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                        <Button onClick={handleCreateSession} className="w-full">
                          Save
                        </Button>
                      </div>
                    </PopoverContent>
                  )}
                </Popover>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
