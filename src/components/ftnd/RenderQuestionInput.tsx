import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import type { FTNDQuestion } from "../../data/ftnd.data";
import { Currency } from "@/types/enums/Currency";

interface RenderQuestionInputProps {
  currentQuestionData: FTNDQuestion;
  currentAnswer: number | string | undefined;
  handleAnswer: (value: number | string, currency?: string) => void;
}

export const RenderQuestionInput: React.FC<RenderQuestionInputProps> = ({
  currentQuestionData,
  currentAnswer,
  handleAnswer,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    Currency.VND
  );

  const currencies = [
    { code: Currency.VND, symbol: "₫", name: "Vietnamese Dong" },
    { code: Currency.USD, symbol: "$", name: "US Dollar" },
  ];

  if (currentQuestionData.type === "text") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <Input
          type="text"
          value={currentAnswer !== undefined ? currentAnswer.toString() : ""}
          onChange={(e) => handleAnswer(e.target.value)}
          className="w-full h-12 text-base border-2 border-muted-foreground/20 focus:border-primary transition-all duration-200 rounded-lg"
          placeholder="Enter your answer..."
        />
      </motion.div>
    );
  } else if (currentQuestionData.type === "number") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <div className="flex items-center space-x-3">
          <Input
            type="number"
            min="0"
            value={currentAnswer !== undefined ? currentAnswer : ""}
            onChange={(e) => {
              const value = e.target.value;
              // Pass currency along with value for price questions
              if (currentQuestionData.isPriceQuestion) {
                handleAnswer(value, selectedCurrency);
              } else {
                handleAnswer(value);
              }
            }}
            className="flex-1 h-12 text-base border-2 border-muted-foreground/20 focus:border-primary transition-all duration-200 rounded-lg"
            placeholder="0"
          />
          {currentQuestionData.isPriceQuestion ? (
            <div className="flex items-center space-x-2">
              <Select
                value={selectedCurrency}
                onValueChange={(value: Currency) => {
                  setSelectedCurrency(value);
                  if (currentAnswer !== undefined) {
                    handleAnswer(currentAnswer, value);
                  }
                }}
              >
                <SelectTrigger className="w-28 h-12 border-2 border-muted-foreground/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{currency.symbol}</span>
                        <span className="text-xs text-muted-foreground">
                          {currency.code}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-2 rounded-md">
                {currencies.find((c) => c.code === selectedCurrency)?.symbol}{" "}
                {selectedCurrency}
              </span>
            </div>
          ) : currentQuestionData.unit ? (
            <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-2 rounded-md">
              {currentQuestionData.unit}
            </span>
          ) : null}
        </div>

        {currentQuestionData.isPriceQuestion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200"
          >
            <div className="flex items-center space-x-1">
              <span>💡</span>
              <span>
                Tip: Select the currency that matches your local pricing for
                accurate tracking.
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <RadioGroup
          value={
            currentAnswer !== undefined ? currentAnswer.toString() : undefined
          }
          onValueChange={(value) => handleAnswer(Number(value))}
          className="space-y-3"
        >
          {currentQuestionData.options?.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`option-${option.value}`}
                  className="border-2 border-muted-foreground/40 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <Label
                  htmlFor={`option-${option.value}`}
                  className="flex-1 cursor-pointer text-base font-medium leading-relaxed group-hover:text-primary transition-colors duration-200"
                >
                  {option.label}
                </Label>
                <AnimatePresence>
                  {currentAnswer?.toString() === option.value.toString() && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary"
                    >
                      <Check className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </RadioGroup>
      </motion.div>
    );
  }
};

export default RenderQuestionInput;
