import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, MessageCircle, UserPlus } from "lucide-react";
import { clients } from "@/utils/mockdata/coach";
import { useTranslate } from "@/hooks/useTranslate";

export function ClientsTab() {
  const { tCoach } = useTranslate();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder={tCoach("coachdashboard.clients.searchPlaceholder")}
          />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          {tCoach("coachdashboard.clients.addClient")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {tCoach("coachdashboard.clients.activeClients")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {tCoach("coachdashboard.clients.table.name")}
                </TableHead>
                <TableHead>
                  {tCoach("coachdashboard.clients.table.progress")}
                </TableHead>
                <TableHead>
                  {tCoach("coachdashboard.clients.table.lastSession")}
                </TableHead>
                <TableHead>
                  {tCoach("coachdashboard.clients.table.status")}
                </TableHead>
                <TableHead>
                  {tCoach("coachdashboard.clients.table.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.name}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.progress}%</TableCell>
                  <TableCell>{client.lastSession}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        client.status ===
                        "coachdashboard.clientTabs.status.active"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {tCoach(client.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
