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
import { AccountStatus, type User } from "@/types/user/user";
import { useTranslation } from "react-i18next";

export function UsersTab({ users }: { users: User[] }) {
  const { t } = useTranslation();
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
              <TableHead>{t("page.dashboard.userTable.name")}</TableHead>
              <TableHead>{t("page.dashboard.userTable.email")}</TableHead>
              <TableHead>{t("page.dashboard.userTable.role")}</TableHead>
              <TableHead>{t("page.dashboard.userTable.status")}</TableHead>
              <TableHead>{t("page.dashboard.userTable.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
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
                        {t("page.dashboard.userTable.edit")}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {" "}
                        {t("page.dashboard.userTable.viewDetails")}
                      </DropdownMenuItem>
                      {user.status !== AccountStatus.BANNED ? (
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          {t("page.dashboard.userTable.ban")}
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {t("page.dashboard.userTable.unban")}
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
