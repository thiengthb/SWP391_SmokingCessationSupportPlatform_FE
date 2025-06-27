import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { ftndQuestions } from "./ftndData";
import RenderQuestionInput from "./RenderQuestionInput";
import { defaultHealthValue, type HealthCreateRequest } from "@/types/health";

interface FTNDAssessmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FTNDAssessmentForm({
  open,
  onOpenChange,
}: FTNDAssessmentFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [healthInfo, setHealthInfo] =
    useState<HealthCreateRequest>(defaultHealthValue);

  const handleAnswer = (value: number | string) => {
    setAnswers((prev) => ({
      ...prev,
      [ftndQuestions[currentQuestion].id]: Number(value),
    }));

    if (currentQuestion >= 6)
      setHealthInfo((prev) => ({
        ...prev,
        [ftndQuestions[currentQuestion].name]: value,
      }));
  };

  const handleNext = () => {
    if (currentQuestion < ftndQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const totalScore = Object.values(answers).reduce(
        (sum, score) => sum + score,
        0
      );

      await api.post("/v1/healths", { ...healthInfo });

      toast.success("Assessment Completed", {
        description: `Thank you for completing the assessment. Your nicotine dependence score is ${totalScore}.`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting FTND assessment:", error);
      toast.error("Error", {
        description:
          "There was an error submitting your assessment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestion + 1) / ftndQuestions.length) * 100;
  const currentQuestionData = ftndQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Smoking Assessment</DialogTitle>
          <DialogDescription>
            Please answer these questions to help us understand your smoking
            habits
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-right mt-1 text-muted-foreground">
              Question {currentQuestion + 1} of {ftndQuestions.length}
            </p>
          </div>

          <div className="w-full space-y-6">
            <h3 className="font-medium text-lg">
              {currentQuestionData.question}
            </h3>

            <RenderQuestionInput
              currentQuestionData={currentQuestionData}
              currentAnswer={currentAnswer}
              handleAnswer={handleAnswer}
            />
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            type="button"
            disabled={
              (currentQuestionData.type !== "number" &&
                currentAnswer === undefined) ||
              isSubmitting
            }
            onClick={handleNext}
          >
            {currentQuestion < ftndQuestions.length - 1 ? "Next" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FTNDAssessmentForm;
