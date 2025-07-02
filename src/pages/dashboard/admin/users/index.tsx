import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Search } from "lucide-react";
import { UsersTab } from "../components/UsersTable";
import useApi from "@/hooks/useApi";
import { useLocation, useNavigate } from "react-router-dom";
import { type User } from "@/types/models/account";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [users, setUsesrs] = useState<User[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  useEffect(() => {
    const getUsesrs = async () => {
      try {
        const response = await api.get(
          `/v1/accounts?page=0&size=5&direction=ASC`
        );
        console.log("Response data:", response.data);
        console.log("Fetched users:", response.data.result.content);
        setUsesrs(response.data.result.content);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        navigate("/auth/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }
    };

    getUsesrs();
  }, []);

  return (
    <div className="container py-6 space-y-6 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage and monitor user accounts
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <Select
          value={role || ""}
          onValueChange={(val) => setRole(val === "" ? null : val)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="coach">Coach</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UsersTab users={users} />
    </div>
  );
}
