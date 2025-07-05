import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus as AddGoalIcon, Trophy } from "lucide-react";
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

export default function GoalManagement() {
  const [myGoals, setMyGoals] = useState<Goal[]>([]);
  const [publicGoals, setPublicGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [openGoalId, setOpenGoalId] = useState<string | null>(null);
  const [loadingGoalDetail, setLoadingGoalDetail] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  useEffect(() => {
    const getGoalsData = async () => {
      try {
        const [myGoalsRes, allGoalsRes] = await Promise.all([
          api.get("/v1/goals/my-goals"),
          api.get("/v1/goals"),
        ]);
        setMyGoals(myGoalsRes.data.result || []);
        setPublicGoals(allGoalsRes.data.result || []);
      } catch (error) {
        console.error("Error fetching goals:", error);
        navigate("/auth/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }
    };

    getGoalsData();
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
      const response = await api.post("v1/goals", data);
      const { name } = response.data.result;
      toast.success("Goal created successfully!");
      setNewGoal(name);
    } catch (error: any) {
      console.error("Error during goal creation:", error);
      setError("root", {
        type: "server",
        message:
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.",
      });
    }
  };

  const fetchGoalDetails = async (id: string) => {
    setLoadingGoalDetail(true);
    try {
      const res = await api.get(`/v1/goals/goal-details/${id}`);
      setSelectedGoal(res.data.result);
    } catch (err) {
      toast.error("Failed to load goal details");
      setSelectedGoal(null);
    } finally {
      setLoadingGoalDetail(false);
    }
  };

  const renderGoalCard = (goal: Goal) => {
    const progressValue = goal.goalProgress?.progress || 0;
    const criteria = goal.criteriaValue;

    const percentage =
      typeof criteria === "number" && criteria > 0
        ? Math.min((progressValue / criteria) * 100, 100)
        : 0;

    const isCompleted =
      typeof criteria === "number" && criteria > 0 && progressValue >= criteria;

    return (
      <Dialog
        key={goal.id}
        open={openGoalId === goal.id}
        onOpenChange={(open) => {
          if (open) {
            setOpenGoalId(goal.id);
            fetchGoalDetails(goal.id);
          } else {
            setOpenGoalId(null);
            setSelectedGoal(null);
          }
        }}
      >
        <DialogTrigger asChild>
          <Card
            className={`cursor-pointer ${
              isCompleted ? "opacity-100" : "opacity-75"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{goal.name}</CardTitle>
              {isCompleted && <Trophy className="h-4 w-4 text-primary" />}
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {goal.description}
              </p>
              <Progress value={percentage} />
              <p className="text-xs text-muted-foreground text-right">
                {percentage.toFixed(0)}%
              </p>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Goal Details</DialogTitle>
          </DialogHeader>

          {loadingGoalDetail ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : selectedGoal ? (
            <div className="space-y-3 text-sm text-muted-foreground">
              {selectedGoal.iconUrl && (
                <img
                  src={selectedGoal.iconUrl}
                  alt="Icon"
                  className="h-20 w-20 object-contain mx-auto mb-2"
                />
              )}
              <p>
                <strong>Name:</strong> {selectedGoal.name}
              </p>
              <p>
                <strong>Description:</strong> {selectedGoal.description}
              </p>
              <p>
                <strong>Criteria Type:</strong> {selectedGoal.criteriaType}
              </p>
              <p>
                <strong>Criteria Value:</strong> {selectedGoal.criteriaValue}
              </p>
              <div className="space-y-1">
                <strong>Progress:</strong>
                <Progress value={selectedGoal.goalProgress?.progress ?? 0} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-red-500">Failed to load goal.</p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
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

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">My Goals</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myGoals.length > 0 ? (
            myGoals.map(renderGoalCard)
          ) : (
            <p className="text-sm text-muted-foreground">
              No personal goals yet.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Public Goals</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {publicGoals.length > 0 ? (
            publicGoals.map(renderGoalCard)
          ) : (
            <p className="text-sm text-muted-foreground">
              No public goals available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
