import { useEffect, useState } from "react";
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
import {
  calculateScoreFromCirgettesPerDay,
  ftndQuestions,
} from "../../data/ftnd.data";
import RenderQuestionInput from "./RenderQuestionInput";
import {
  defaultHealthValue,
  type HealthInfoUpdate,
} from "@/types/models/health";
import { ResultForm } from "./ResultForm";
import { useFTND } from "@/contexts/FTNDContext";
import type { Currency } from "@/types/models/transaction";

interface FTNDAssessmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FTNDAssessmentForm({
  open,
  onOpenChange,
}: FTNDAssessmentFormProps) {
  const { healthData } = useFTND();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number | string, number | string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [healthInfo, setHealthInfo] = useState<HealthInfoUpdate>();
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [ftndScore, setFtndScore] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("VND");

  useEffect(() => {
    if (healthData) {
      setHealthInfo({
        ftndAnswers: healthData.ftndAnswers || "{}",
        ftndLevel: healthData.ftndLevel || 0,
        cigarettesPerDay: healthData.cigarettesPerDay || 0,
        cigarettesPerPack: healthData.cigarettesPerPack || 0,
        packPrice: healthData.packPrice || 0,
        currency: healthData.currency || "USD",
        reasonToQuit: healthData.reasonToQuit || "",
        smokeYear: healthData.smokeYear || 0,
      });
      const parsedAnswers = JSON.parse(healthData.ftndAnswers || "{}");
      setAnswers(parsedAnswers);
      setFtndScore(healthData.ftndLevel || 0);
    }
  }, [healthData]);

  const handleAnswer = (value: number | string, currency?: string) => {
    setAnswers((prev) => ({
      ...prev,
      [ftndQuestions[currentQuestion].id]: value,
    }));

    if (currentQuestion >= 5) {
      setHealthInfo((prev) => ({
        ...prev,
        [ftndQuestions[currentQuestion].name]: value,
        ...(currency &&
          ftndQuestions[currentQuestion].name === "packPrice" && {
            currency: currency as Currency,
          }),
      }));
    }

    // Update currency for price questions
    if (currency && ftndQuestions[currentQuestion].name === "packPrice") {
      setSelectedCurrency(currency);
      setHealthInfo((prev) => ({
        ...prev,
        currency: currency as Currency,
      }));
    }
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
      let result = 0;
      const ftndAnswerObject: Record<number | string, number | string> = {};

      for (let i = 1; i <= 5; i++) {
        ftndAnswerObject[i] = answers[i];
      }

      for (let i = 1; i <= currentQuestion; i++) {
        if (i >= 7) break;
        if (i === 6)
          result += calculateScoreFromCirgettesPerDay(answers[i] as number);
        else result += answers[i] as number;
      }

      const updatedHealthInfo = {
        ...healthInfo,
        ftndAnswers: JSON.stringify(ftndAnswerObject),
        ftndLevel: result,
        currency: selectedCurrency, // Ensure currency is included
      };

      console.log("Submitting FTND assessment:", updatedHealthInfo);

      await api.post("/v1/healths", updatedHealthInfo);

      setFtndScore(result);
      setShowCompletionDialog(true);
    } catch (error: unknown) {
      console.error("Error submitting FTND assessment:", error);
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error.response as any)?.data?.message
          : "An error occurred while submitting your assessment. Please try again later.";
      toast.error("Error", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestion + 1) / ftndQuestions.length) * 100;
  const currentQuestionData = ftndQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id];

  if (showCompletionDialog) {
    return (
      <ResultForm
        open={showCompletionDialog}
        ftndScore={ftndScore}
        onOpenChange={(open) => {
          setShowCompletionDialog(open);
          if (!open) {
            onOpenChange(false);
          } else {
            setCurrentQuestion(0);
            setAnswers({});
            setHealthInfo(defaultHealthValue);
          }
        }}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold">
            🚭 Smoking Assessment
          </DialogTitle>
          <DialogDescription className="text-base">
            Please answer these questions to help us understand your smoking
            habits and create a personalized plan for you.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Progress
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3 bg-muted" />
            <p className="text-xs text-right mt-2 text-muted-foreground">
              Question {currentQuestion + 1} of {ftndQuestions.length}
            </p>
          </div>

          <div className="w-full space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-lg leading-relaxed text-gray-800">
                {currentQuestionData.question}
              </h3>
            </div>

            <RenderQuestionInput
              currentQuestionData={currentQuestionData}
              currentAnswer={currentAnswer}
              handleAnswer={handleAnswer}
            />
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6"
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
            className="px-6"
          >
            {isSubmitting
              ? "Submitting..."
              : currentQuestion < ftndQuestions.length - 1
              ? "Next"
              : "Complete Assessment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FTNDAssessmentForm;
