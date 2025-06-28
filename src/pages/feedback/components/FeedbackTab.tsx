import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FormInputError from "@/components/FormInputError";
import StarRatingInput from "./StarRating"; 
import useApi from "@/hooks/useApi";
import { feedbackSchema, type feedbackFormData } from "@/types/member/feedback";
export default function FeedbackManagement() {
  const api = useApi();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<feedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const onSubmit: SubmitHandler<feedbackFormData> = async (data) => {
    try {
      await api.post("/v1/feedback", data);
      toast.success("Feedback submitted successfully!");
      reset({ comment: "", rating: 0 });
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to send feedback");
      setError("root", {
        type: "server",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-6">
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              placeholder="Your feedback (optional)..."
              {...register("comment")}
            />
          </div>

          <div className="grid gap-2">
            <Label>Rating</Label>
            <StarRatingInput
              value={watch("rating")}
              onChange={(val) => setValue("rating", val)}
            />
            <FormInputError field={errors.rating} />
          </div>

          <FormInputError field={errors.root} />
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
