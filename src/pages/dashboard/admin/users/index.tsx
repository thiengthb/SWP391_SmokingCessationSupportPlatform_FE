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
import { Search, UserPlus } from "lucide-react";
import { UsersTab } from "../components/UsersTable";
import useApi from "@/hooks/useApi";
import { useLocation, useNavigate } from "react-router-dom";
import { type Account } from "@/types/models/account";
import { useForm, type SubmitHandler } from "react-hook-form";
import { userFormSchema, type userFormData } from "@/types/validations/auth/user";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputError from "@/components/FormInputError";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [users, setUsers] = useState<Account[]>([]);
  const [newUser, setNewUser] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const size = 10;

  const [viewedUser, setViewedUser] = useState<Account | null>(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Account | null>(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get(
          `/v1/accounts?page=${page}&size=${size}&direction=ASC`
        );
        const { content, totalElements } = response.data.result;
        setUsers(content || []);
        setTotalPages(Math.ceil(totalElements / size) || 1);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        navigate("/auth/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }
    };

    getUsers();
  }, [newUser, page]);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const generatePageNumbers = (
    current: number,
    total: number
  ): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current > 3) pages.push(1, "...");
      const start = Math.max(1, current - 1);
      const end = Math.min(total, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 2) pages.push("...", total);
      else if (!pages.includes(total)) pages.push(total);
    }
    return pages;
  };

  const onViewUser = async (id: string) => {
    try {
      const res = await api.get(`/v1/accounts/${id}`);
      setViewedUser(res.data.result);
      setViewDialogOpen(true);
    } catch {
      toast.error("Failed to fetch user details");
    }
  };

  const onEditUser = async (id: string) => {
    try {
      const res = await api.get(`/v1/accounts/${id}`);
      const userData = res.data.result;
      setEditingUser(userData);

      setValue("email", userData.email);
      setValue("phoneNumber", userData.phoneNumber);
      setValue("password", "");
      setValue("role", userData.role);

      setEditDialogOpen(true);
    } catch {
      toast.error("Failed to load user for editing");
    }
  };

  const onToggleBan = async (id: string, isBanned: boolean) => {
    try {
      await api.put(`/v1/accounts/ban/${id}`);
      toast.success(`${isBanned ? "Unbanned" : "Banned"} successfully`);
      setNewUser(Date.now().toString());
    } catch {
      toast.error("Failed to change ban status");
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<userFormData>({
    resolver: zodResolver(userFormSchema),
  });

  const onSubmit: SubmitHandler<userFormData> = async (data) => {
    try {
      const response = await api.post("v1/accounts", data as userFormData);
      const { username } = response.data.result;
      toast("User created successfully!");
      setNewUser(username);
      setAddDialogOpen(false);
    } catch (error: any) {
      setError("root", {
        type: "server",
        message: error.response?.data?.message ?? "Unexpected error",
      });
    }
  };

  const onUpdateUser: SubmitHandler<userFormData> = async (data) => {
    if (!editingUser) return;
    try {
      const { email, password, phoneNumber } = data;

      await api.put(`/v1/accounts/${editingUser.id}`, {
        email,
        password,
        phoneNumber,
      });

      toast.success("User updated successfully!");
      setEditDialogOpen(false);
      setNewUser(Date.now().toString());
    } catch (error: any) {
      setError("root", {
        type: "server",
        message: error.response?.data?.message ?? "Unexpected error",
      });
    }
  };

  return (
    <div className="container py-6 space-y-6 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage and monitor user accounts
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Enter details for the new user
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input type="email" {...register("email")} />
                  <FormInputError field={errors.email} />
                </div>
                <div className="grid gap-2">
                  <Label>Password</Label>
                  <Input type="password" {...register("password")} />
                  <FormInputError field={errors.password} />
                </div>
                <div className="grid gap-2">
                  <Label>Phone Number</Label>
                  <Input {...register("phoneNumber")} />
                  <FormInputError field={errors.phoneNumber} />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Select
                    onValueChange={(val: userFormData["role"]) =>
                      setValue("role", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="COACH">Coach</SelectItem>
                      <SelectItem value="MEMBER">Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormInputError field={errors.role} />
                </div>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
              <FormInputError field={errors.root} />
            </form>
          </DialogContent>
        </Dialog>
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
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="COACH">Coach</SelectItem>
            <SelectItem value="MEMBER">Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UsersTab
        users={users}
        page={page}
        size={size}
        onEditUser={onEditUser}
        onViewUser={onViewUser}
        onToggleBan={onToggleBan}
      />

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevious}
                  className={
                    page === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {generatePageNumbers(page + 1, totalPages).map((item, index) => (
                <PaginationItem key={index}>
                  {item === "..." ? (
                    <span className="px-2 text-muted-foreground">...</span>
                  ) : (
                    <PaginationLink
                      isActive={item === page + 1}
                      onClick={() => setPage(Number(item) - 1)}
                    >
                      {item}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  className={
                    page >= totalPages - 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {viewedUser && (
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div>
                <b>Username:</b> {viewedUser.username}
              </div>
              <div>
                <b>Email:</b> {viewedUser.email}
              </div>
              <div>
                <b>Phone Number:</b> {viewedUser.phoneNumber}
              </div>
              <div>
                <b>Role:</b> {viewedUser.role}
              </div>
              <div>
                <b>Status:</b> {viewedUser.status}
              </div>
              <div>
                <b>Subscription:</b>{" "}
                {viewedUser.havingSubscription ? "Yes" : "No"}
              </div>
              <div>
                <b>Created At:</b>{" "}
                {new Date(viewedUser.createdAt).toLocaleString()}
              </div>
              <div>
                <b>Updated At:</b>{" "}
                {new Date(viewedUser.updatedAt).toLocaleString()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update email, password and phone number
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onUpdateUser)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
                <FormInputError field={errors.email} />
              </div>
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" {...register("password")} />
                <FormInputError field={errors.password} />
              </div>
              <div className="grid gap-2">
                <Label>Phone Number</Label>
                <Input {...register("phoneNumber")} />
                <FormInputError field={errors.phoneNumber} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
            <FormInputError field={errors.root} />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
