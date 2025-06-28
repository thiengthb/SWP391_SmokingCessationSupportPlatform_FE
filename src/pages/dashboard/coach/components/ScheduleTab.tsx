import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Video, CalendarDays } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { appointments } from "@/utils/mockdata/coach";
import { useTranslation } from "react-i18next";

export function ScheduleTab() {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayAppointments = appointments.find(
    (app) => app.date.toDateString() === date?.toDateString()
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <CalendarDays className="h-5 w-5" />
          {t("page.coachdashboard.schedule.title")}
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
              {date
                ? format(date, "MMMM d, yyyy")
                : t("page.coachdashboard.schedule.noDateSelected")}
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
                {t("page.coachdashboard.schedule.noAppointments")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
