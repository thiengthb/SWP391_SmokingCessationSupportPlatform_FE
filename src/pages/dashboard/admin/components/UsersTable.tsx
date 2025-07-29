import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreVertical, Ban, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { type Account } from "@/types/models/account";
import { AccountStatus } from "@/types/enums/AccountStatus";
import { useTranslate } from "@/hooks/useTranslate";

export function UsersTab({
  users,
  page,
  size,
}: {
  users: Account[];
  page: number;
  size: number;
  onEditUser: (id: string) => void;
  onViewUser: (id: string) => void;
  onToggleBan: (id: string, isBanned: boolean) => void;
}) {
  const { tAdmin } = useTranslate();
  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      banned: "destructive",
    } as const;
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{tAdmin("admindashboard.userTable.name")}</TableHead>
              <TableHead>{tAdmin("admindashboard.userTable.email")}</TableHead>
              <TableHead>{tAdmin("admindashboard.userTable.role")}</TableHead>
              <TableHead>{tAdmin("admindashboard.userTable.status")}</TableHead>
              <TableHead>
                {tAdmin("admindashboard.userTable.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="text-center">
                  {page * size + index + 1}
                </TableCell>
                <TableCell className="px-2">{user.username}</TableCell>
                <TableCell className="px-2">{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell className="px-2">
                  {getStatusBadge(user.status)}
                </TableCell>
                <TableCell className="px-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        {" "}
                        {tAdmin("admindashboard.userTable.edit")}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {" "}
                        {tAdmin("admindashboard.userTable.viewDetails")}
                      </DropdownMenuItem>
                      {user.status !== AccountStatus.BANNED ? (
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          {tAdmin("admindashboard.userTable.ban")}
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {tAdmin("admindashboard.userTable.unban")}
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
