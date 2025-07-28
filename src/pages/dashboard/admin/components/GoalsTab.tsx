import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputError from "@/components/FormInputError";
import useApi from "@/hooks/useApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { goalFormSchema, type goalFormData } from "@/types/member/goalFormData";
import type { Goal } from "@/types/member/goal";

export default function AdminGoalsTab() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>("");
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [goalDetail, setGoalDetail] = useState<Goal | null>(null);

  const api = useApi();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<goalFormData>({
    resolver: zodResolver(goalFormSchema),
  });

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get("/v1/goals");
        setGoals(response.data.result || []);
      } catch (error) {
        toast.error("Failed to fetch goals");
      }
    };

    fetchGoals();
  }, [newGoal]);

  useEffect(() => {
    if (selectedGoalId) {
      const fetch = async () => {
        try {
          const res = await api.get(`/v1/goals/goal-details/${selectedGoalId}`);
          setGoalDetail(res.data.result);
        } catch {
          toast.error("Failed to load goal details");
          setGoalDetail(null);
        }
      };
      fetch();
    }
  }, [selectedGoalId]);

  const onSubmit: SubmitHandler<goalFormData> = async (data) => {
    try {
      const response = await api.post("/v1/goals", data);
      setNewGoal(response.data.result.name);
      toast.success("Goal created successfully!");
      reset();
    } catch (error: any) {
      setError("root", {
        type: "server",
        message: error.response?.data?.message || "Unexpected error",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* --- Create Goal Form --- */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 max-w-xl">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          <FormInputError field={errors.name} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} />
          <FormInputError field={errors.description} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="iconUrl">Icon URL</Label>
          <Input id="iconUrl" {...register("iconUrl")} />
          <FormInputError field={errors.iconUrl} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="criteriaType">Criteria Type</Label>
          <Select
            onValueChange={(val: goalFormData["criteriaType"]) => {
              setValue("criteriaType", val, { shouldValidate: true });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select criteria type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STREAK">Streak</SelectItem>
              <SelectItem value="SMOKE_FREE">Smoke Free</SelectItem>
              <SelectItem value="MONEY_SAVED">Money Saved</SelectItem>
              <SelectItem value="PLAN_STREAK">Plan Streak</SelectItem>
              <SelectItem value="PLAN_COMPLETE">Plan Complete</SelectItem>
              <SelectItem value="PHASE_COMPLETE">Phase Complete</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" {...register("criteriaType")} />
          <FormInputError field={errors.criteriaType} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="goalDifficulty">Difficulty Level</Label>
          <Select
            onValueChange={(val) => {
              setValue("goalDifficulty", val as goalFormData["goalDifficulty"], {
                shouldValidate: true,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select goal difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NORMAL">Normal</SelectItem>
              <SelectItem value="BADGE">Badge</SelectItem>
              <SelectItem value="MEDAL">Medal</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" {...register("goalDifficulty")} />
          <FormInputError field={errors.goalDifficulty} />

        </div>
        <div className="grid gap-2">
          <Label htmlFor="criteriaValue">Criteria Value</Label>
          <Input
            type="number"
            {...register("criteriaValue", { valueAsNumber: true })}
          />
          <FormInputError field={errors.criteriaValue} />
        </div>
        <FormInputError field={errors.root} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Goal"}
        </Button>
      </form>

      {/* --- Goals Grid --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          return (
            <Dialog
              key={goal.id}
              open={selectedGoalId === goal.id}
              onOpenChange={(open) => {
                setSelectedGoalId(open ? goal.id : null);
              }}
            >
              <DialogTrigger asChild>
                <Card className={`cursor-pointer "opacity-100"`}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {goal.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {goal.description}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Goal Details</DialogTitle>
                </DialogHeader>
                {goalDetail ? (
                  <div className="space-y-3 text-sm text-muted-foreground">
                    {goalDetail.iconUrl && (
                      <img
                        src={goalDetail.iconUrl}
                        alt="Icon"
                        className="h-20 w-20 object-contain mx-auto"
                      />
                    )}
                    <p>
                      <strong>Name:</strong> {goalDetail.name}
                    </p>
                    <p>
                      <strong>Description:</strong> {goalDetail.description}
                    </p>
                    <p>
                      <strong>Criteria Type:</strong> {goalDetail.criteriaType}
                    </p>
                    <p>
                      <strong>Criteria Value:</strong>{" "}
                      {goalDetail.criteriaValue}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-red-500">
                    Failed to load goal details.
                  </p>
                )}
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}
