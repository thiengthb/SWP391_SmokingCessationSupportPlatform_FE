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
import { AccountStatus, type Account } from "@/types/models/account";

export function UsersTab({
  users,
  page,
  size,
  onEditUser,
  onViewUser,
  onToggleBan,
}: {
  users: Account[];
  page: number;
  size: number;
  onEditUser: (id: string) => void;
  onViewUser: (id: string) => void;
  onToggleBan: (id: string, isBanned: boolean) => void;
}) {
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
              <TableHead className="w-[60px] text-center">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
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
                      <DropdownMenuItem onClick={() => onEditUser(user.id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewUser(user.id)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          onToggleBan(user.id, user.status === AccountStatus.BANNED)
                        }
                        className={
                          user.status !== AccountStatus.BANNED
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {user.status !== AccountStatus.BANNED ? (
                          <>
                            <Ban className="h-4 w-4 mr-2" />
                            Ban User
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Unban User
                          </>
                        )}
                      </DropdownMenuItem>
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
