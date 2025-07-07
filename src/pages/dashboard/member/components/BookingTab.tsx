import { useState } from "react";
import { format } from "date-fns";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { bookingSchema, type bookingFormData } from "@/types/member/bookingFormData";
import useApi from "@/hooks/useApi";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormInputError from "@/components/FormInputError";
import { toast } from "sonner";

export function BookingsTab() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const api = useApi();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<bookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit: SubmitHandler<bookingFormData> = async (data) => {
    try {
      const [sh, sm] = data.startedAt.split(":").map(Number);
      const [eh, em] = data.endedAt.split(":").map(Number);

      const startedAt = new Date(selectedDate);
      startedAt.setHours(sh, sm, 0, 0);

      const endedAt = new Date(selectedDate);
      endedAt.setHours(eh, em, 0, 0);

      const payload = {
        coachId: data.coachId,
        bookingReason: data.bookingReason,
        startedAt: format(startedAt, "yyyy-MM-dd'T'HH:mm"),
        endedAt: format(endedAt, "yyyy-MM-dd'T'HH:mm"),
      };

      await api.post("/v1/bookings", payload);

      toast.success("Booking created successfully!");
      reset();
      setSelectedDate(new Date());
    } catch (error: any) {
      console.error("Booking error:", error);
      setError("root", {
        type: "server",
        message:
          error?.response?.data?.message || "Unexpected error. Please try again.",
      });
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
      {/* Left: Calendar */}
      <div className="flex flex-col items-center space-y-4">
        <div className="text-lg font-semibold">Select Booking Date</div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(d) => d && setSelectedDate(d)}
          className="rounded-md border"
        />
      </div>

      {/* Right: Form */}
      <div className="md:pt-10 space-y-4 max-w-lg">
        <h2 className="text-xl font-semibold">Booking Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="coachId">Coach ID</Label>
            <Input id="coachId" placeholder="Enter coach ID" {...register("coachId")} />
            <FormInputError field={errors.coachId} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bookingReason">Booking Reason</Label>
            <Input
              id="bookingReason"
              placeholder="Why do you need this booking?"
              {...register("bookingReason")}
            />
            <FormInputError field={errors.bookingReason} />
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

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Create Booking"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
