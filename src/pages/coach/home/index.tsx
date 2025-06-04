import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar as CalendarIcon } from "lucide-react";
import { clientStats, clients, appointments } from "@/utils/mockdata/coach";

export default function CoachHome() {
  const todayAppointments = appointments[0]?.sessions || [];

  return (
    <div className="container py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {clientStats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <h3 className="text-sm font-medium mb-2">{stat.title}</h3>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change} from last period</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Today's Sessions</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {todayAppointments.map((session, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{session.clientName}</p>
                    <p className="text-sm text-muted-foreground">{session.time}</p>
                  </div>
                </div>
                <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                  {session.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Clients</h3>
          <div className="space-y-4">
            {clients.slice(0, 5).map((client) => (
              <div key={client.name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">Last session: {client.lastSession}</p>
                  </div>
                </div>
                <Badge>{client.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
