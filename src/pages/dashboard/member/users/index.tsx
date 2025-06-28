import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus as AddGoalIcon, Star, Trophy } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

export default function GoalManagement() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>("");
  const [modalPage, setModalPage] = useState<number>(0);
  const modalPageSize = 6;

  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  useEffect(() => {
    const getGoals = async () => {
      try {
        const response = await api.get("/v1/goals/my-goals?direction=ASC");
        const { content } = response.data.result;
        setGoals(content || []);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
        navigate("/auth/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }
    };

    getGoals();
  }, [newGoal]);

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

  const previewGoals = goals
    .filter((goal) => (goal.goalProgress?.progress || 0) < goal.criteriaValue) 
    .sort((a, b) => {
      const progressA = (a.goalProgress?.progress || 0) / a.criteriaValue;
      const progressB = (b.goalProgress?.progress || 0) / b.criteriaValue;
      return progressB - progressA; 
    })
    .slice(0, 3);
  const paginatedGoals = goals.slice(
    modalPage * modalPageSize,
    (modalPage + 1) * modalPageSize
  );
  const totalPages = Math.ceil(goals.length / modalPageSize);

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
              <AddGoalIcon className="mr-2 h-4 w-4" /> Add Goal
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
                    {...register("criteriaValue", { valueAsNumber: true })}
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

      <div className="space-y-8">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" /> Personal Goals
                </CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle>All Personal Goals</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              {paginatedGoals.map((goal) => {
                const progressValue = goal.goalProgress?.progress || 0;
                const percentage = Math.min(
                  (progressValue / goal.criteriaValue) * 100,
                  100
                );
                const isCompleted = progressValue >= goal.criteriaValue;

                return (
                  <Card
                    key={goal.id}
                    className={`${
                      isCompleted ? "opacity-100" : "opacity-75"
                    } w-full`}
                  >
                    <div className="flex items-center p-4 space-x-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium truncate pr-2">
                            {goal.name}
                          </h3>
                          {isCompleted && (
                            <Trophy className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                        </div>

                        <div className="space-y-1">
                          <Progress value={percentage} className="h-2" />
                          <p className="text-xs text-muted-foreground text-right">
                            {percentage.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setModalPage((prev) => Math.max(prev - 1, 0))
                      }
                      className={
                        modalPage === 0
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={i === modalPage}
                        onClick={() => setModalPage(i)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setModalPage((prev) =>
                          Math.min(prev + 1, totalPages - 1)
                        )
                      }
                      className={
                        modalPage === totalPages - 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {previewGoals.map((goal) => {
            const progressValue = goal.goalProgress?.progress || 0;
            const percentage = Math.min(
              (progressValue / goal.criteriaValue) * 100,
              100
            );
            const isCompleted = progressValue >= goal.criteriaValue;
            return (
              <Card
                key={goal.id}
                className={isCompleted ? "opacity-100" : "opacity-75"}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {goal.name}
                  </CardTitle>
                  {isCompleted && <Trophy className="h-4 w-4 text-primary" />}
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                  <Progress value={percentage} />
                  <p className="text-xs text-muted-foreground text-right">
                    {percentage.toFixed(0)}%
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
