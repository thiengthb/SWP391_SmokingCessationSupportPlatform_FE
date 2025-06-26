import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus as AddGoalIcon } from "lucide-react";
import { GoalsTab } from "../components/GoalsTab";
import useApi from "@/hooks/useApi";
import { useLocation, useNavigate } from "react-router-dom";
import { type Goal } from "@/types/member/goal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { goalFormSchema, type goalFormData } from "@/types/member/goalFormData";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function GoalManagement() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const size = 5;

  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  useEffect(() => {
    const getGoals = async () => {
      try {
        const response = await api.get(
          `/v1/goals/my-goals?page=${page}&size=${size}&direction=ASC`
        );
        const { content, totalElements } = response.data.result;
        setGoals(content || []);
        setTotalPages(Math.ceil(totalElements / size) || 1);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
        navigate("/auth/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }
    };

    getGoals();
  }, [newGoal, page]);

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  function generatePageNumbers(
    current: number,
    total: number
  ): (number | "...")[] {
    const pages: (number | "...")[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current > 3) {
        pages.push(1, "...");
      }

      const start = Math.max(1, current - 1);
      const end = Math.min(total, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push("...", total);
      } else if (!pages.includes(total)) {
        pages.push(total);
      }
    }

    return pages;
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<goalFormData>({
    resolver: zodResolver(goalFormSchema),
  });

  const onSubmit: SubmitHandler<goalFormData> = async (data) => {
    try {
      const response = await api.post("v1/goals", data as goalFormData);
      const { name } = response.data.result;
      toast.success("Goal created successfully!");
      setNewGoal(name);
    } catch (error: any) {
      console.error("Error during goal creation:", error);
      if (error.response?.data?.message) {
        setError("root", {
          type: "server",
          message: error.response.data.message,
        });
      } else {
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <div className="container py-6 space-y-6 mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Goal Management</h1>
          <p className="text-muted-foreground">Manage and monitor goals</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <AddGoalIcon className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
              <DialogDescription>
                Enter details for the new goal
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter goal name"
                    {...register("name")}
                  />
                  <FormInputError field={errors.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter description"
                    {...register("description")}
                  />
                  <FormInputError field={errors.description} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="iconUrl">Icon URL</Label>
                  <Input
                    id="iconUrl"
                    placeholder="Enter icon URL"
                    {...register("iconUrl")}
                  />
                  <FormInputError field={errors.iconUrl} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="criteriaType">Criteria Type</Label>
                  <Select
                    onValueChange={(val: goalFormData["criteriaType"]) =>
                      setValue("criteriaType", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select criteria type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STREAK">Streak</SelectItem>
                      <SelectItem value="SMOKE_FREE">Smoke Free</SelectItem>
                      <SelectItem value="MONEY_SAVED">Money Saved</SelectItem>
                      <SelectItem value="PLAN_STREAK">Plan Streak</SelectItem>
                      <SelectItem value="PLAN_COMPLETE">
                        Plan Complete
                      </SelectItem>
                      <SelectItem value="PHASE_COMPLETE">
                        Phase Complete
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormInputError field={errors.criteriaType} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="criteriaValue">Criteria Value</Label>
                  <Input
                    id="criteriaValue"
                    type="number"
                    placeholder="Enter criteria value"
                    {...register("criteriaValue", {
                      valueAsNumber: true,
                    })}
                  />
                  <FormInputError field={errors.criteriaValue} />
                </div>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create"}
                  </Button>
                </DialogClose>
              </DialogFooter>
              <FormInputError field={errors.root} />
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <GoalsTab goals={goals} page={page} size={size} />

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
    </div>
  );
}