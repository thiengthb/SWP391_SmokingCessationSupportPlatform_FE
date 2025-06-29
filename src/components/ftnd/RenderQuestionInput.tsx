import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { FTNDQuestion } from "./ftndData";

interface RenderQuestionInputProps {
  currentQuestionData: FTNDQuestion;
  currentAnswer: number | string | undefined;
  handleAnswer: (value: number | string) => void;
}

export const RenderQuestionInput: React.FC<RenderQuestionInputProps> = ({
  currentQuestionData,
  currentAnswer,
  handleAnswer,
}) => {
  if (currentQuestionData.type === "text") {
    return (
      <Input
        type="text"
        value={currentAnswer !== undefined ? currentAnswer.toString() : ""}
        onChange={(e) => handleAnswer(e.target.value)}
        className="w-full"
      />
    );
  } else if (currentQuestionData.type === "number") {
    return (
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          min="0"
          value={currentAnswer !== undefined ? currentAnswer : ""}
          onChange={(e) => handleAnswer(e.target.value)}
          className="w-full"
        />
        {currentQuestionData.unit && (
          <span className="flex-1 text-sm">{currentQuestionData.unit}</span>
        )}
      </div>
    );
  } else {
    return (
      <RadioGroup
        value={
          currentAnswer !== undefined ? currentAnswer.toString() : undefined
        }
        onValueChange={(value) => handleAnswer(Number(value))}
        className="space-y-3"
      >
        {currentQuestionData.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value.toString()}
              id={`option-${option.value}`}
            />
            <Label
              htmlFor={`option-${option.value}`}
              className="cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  }
};

export default RenderQuestionInput;
