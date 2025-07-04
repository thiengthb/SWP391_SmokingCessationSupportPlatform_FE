import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Clock, Plus, Pencil } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "@/hooks/useApi";
import type { TimeTable } from "@/types/coach/user";
import {
  timeTableFormSchema,
  type timeTableFormData,
} from "@/types/coach/timeTableFormData";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import FormInputError from "@/components/FormInputError";

export function ScheduleManagement() {
  const [date, setDate] = useState<Date>(new Date());
  const [timetables, setTimetables] = useState<TimeTable[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState<TimeTable | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const api = useApi();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<timeTableFormData>({
    resolver: zodResolver(timeTableFormSchema),
  });

  useEffect(() => {
    const getTimetables = async () => {
      try {
        const response = await api.get(
          "/v1/timetables?page=0&size=100&direction=ASC"
        );
        setTimetables(response.data.result.content || []);
      } catch (error) {
        console.error(" Failed to fetch timetables", error);
        navigate("/auth/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }
    };

    if (location.state?.refresh) {
      getTimetables();

      window.history.replaceState({}, document.title);
    } else {
      getTimetables();
    }
  }, []);

  const onSubmit: SubmitHandler<timeTableFormData> = async (data) => {
    try {
      const [sh, sm] = data.startedAt.split(":").map(Number);
      const [eh, em] = data.endedAt.split(":").map(Number);

      const startedAt = new Date(date);
      startedAt.setHours(sh);
      startedAt.setMinutes(sm);
      startedAt.setSeconds(0);
      startedAt.setMilliseconds(0);

      const endedAt = new Date(date);
      endedAt.setHours(eh);
      endedAt.setMinutes(em);
      endedAt.setSeconds(0);
      endedAt.setMilliseconds(0);

      const payload = {
        name: data.name.trim(),
        description: data.description.trim(),
        startedAt: format(startedAt, "yyyy-MM-dd'T'HH:mm"),
        endedAt: format(endedAt, "yyyy-MM-dd'T'HH:mm"),
      };
      console.log("Submitting payload:", payload);
      if (editing) {
        const response = await api.put(`/v1/timetables/${editing.id}`, payload);
        setTimetables((prev) =>
          prev.map((t) => (t.id === editing.id ? response.data.result : t))
        );
        toast.success("Session updated!");
      } else {
        const response = await api.post("/v1/timetables", payload);
        console.log("API response:", response.data.result);
        setTimetables((prev) => [...prev, response.data.result]);
        toast.success("Session created!");
      }

      reset();
      setEditing(null);
      setOpenDialog(false);
    } catch (error: any) {
      setError("root", {
        type: "server",
        message:
          error?.response?.data?.message ||
          "Unexpected error. Please try again.",
      });
    }
  };

  const handleEdit = (session: TimeTable) => {
    setEditing(session);
    setValue("name", session.name);
    setValue("description", session.description);
    setValue("startedAt", format(new Date(session.startedAt), "HH:mm"));
    setValue("endedAt", format(new Date(session.endedAt), "HH:mm"));
    setOpenDialog(true);
  };

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
      {/* Calendar */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <CalendarDays className="h-5 w-5" /> Schedule
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && setDate(d)}
          className="rounded-md border"
        />
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                reset();
                setEditing(null);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Session" : "Add New Session"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Client Name"
                  {...register("name")}
                />
                <FormInputError field={errors.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Session Description"
                  {...register("description")}
                />
                <FormInputError field={errors.description} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startedAt">Start Time</Label>
                <Input type="time" id="startedAt" {...register("startedAt")} />
                <FormInputError field={errors.startedAt} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endedAt">End Time</Label>
                <Input type="time" id="endedAt" {...register("endedAt")} />
                <FormInputError field={errors.endedAt} />
              </div>
              <FormInputError field={errors.root} />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : editing ? "Update" : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Timeline */}
      <div className="md:pt-12 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{format(date, "MMMM d, yyyy")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[650px] overflow-y-auto pr-2">
            {timetables
              .filter(
                (t) =>
                  new Date(t.startedAt).toDateString() === date.toDateString()
              )
              .map((t) => {
                return (
                  <div key={t.id} className="border-b py-2 px-1">
                    <div
                      className="p-3 rounded-md border shadow-sm bg-background cursor-pointer hover:bg-accent"
                      onClick={() => handleEdit(t)}
                    >
                      <div className="font-semibold text-base">
                        {t.name?.trim() ? (
                          t.name
                        ) : (
                          <span className="italic text-muted-foreground">
                            No Name
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t.description}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Clock className="mr-1 h-4 w-4" />
                        {format(new Date(t.startedAt), "HH:mm")} -{" "}
                        {format(new Date(t.endedAt), "HH:mm")}
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <Badge variant="default">confirmed</Badge>
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
