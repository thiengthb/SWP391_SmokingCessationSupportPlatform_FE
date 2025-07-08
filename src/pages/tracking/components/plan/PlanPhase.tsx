import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { format, isToday } from "date-fns";
import { vi } from "date-fns/locale";
import {
  CalendarIcon,
  Trash2,
  Check,
  X,
  PlusCircle,
  MinusCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Phase } from "@/types/models/phase";

interface PlanPhaseProps {
  phase: Phase;
  phaseIndex: number;
  updatePhase: (id: string, phase: Partial<Phase>) => void;
  deletePhase: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
  isCurrent: boolean;
}

export default function PlanPhase({
  phase,
  phaseIndex,
  updatePhase,
  deletePhase,
  isFirst,
  isLast,
  isCurrent,
}: PlanPhaseProps) {
  const [isExpanded, setIsExpanded] = useState(isCurrent || isFirst);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePhase(phase.id, { phaseName: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updatePhase(phase.id, { description: e.target.value });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      updatePhase(phase.id, { startDate: date });
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      updatePhase(phase.id, { endDate: date });
    }
  };

  const handleMaxCigarettesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      updatePhase(phase.id, { cigaretteBound: value });
    }
  };

  const incrementMax = () => {
    updatePhase(phase.id, { cigaretteBound: phase.cigaretteBound + 1 });
  };

  const decrementMax = () => {
    if (phase.cigaretteBound > 0) {
      updatePhase(phase.id, { cigaretteBound: phase.cigaretteBound - 1 });
    }
  };

  // Calculate phase duration in days
  const phaseDurationDays =
    Math.ceil(
      (phase.endDate.getTime() - phase.startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  const addTip = () => {
    const newTips = [...phase.tips, { content: "Mẹo mới..." }];
    updatePhase(phase.id, { tips: newTips });
  };

  const updateTip = (index: number, value: string) => {
    const newTips = [...phase.tips];
    newTips[index] = { content: value };
    updatePhase(phase.id, { tips: newTips });
  };

  const deleteTip = (index: number) => {
    const newTips = [...phase.tips];
    newTips.splice(index, 1);
    updatePhase(phase.id, { tips: newTips });
  };

  return (
    <Card
      className={`${
        isCurrent ? "border-primary shadow-lg" : "border-gray-200"
      } transition-all duration-200`}
    >
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {phase.phaseName}
              </h3>
            </div>
            {isCurrent && <Badge variant="default">Hiện tại</Badge>}
            {phase.completed && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                <Check className="mr-1 h-3 w-3" />
                Hoàn thành
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Giai đoạn {phaseIndex + 1} • Tối đa {phase.cigaretteBound} điếu
              trong {phaseDurationDays} ngày
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {format(phase.startDate, "dd/MM", { locale: vi })} -{" "}
                {format(phase.endDate, "dd/MM", { locale: vi })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <CardContent className="pt-2 space-y-4">
              <div className="space-y-2">
                <Label>Tên giai đoạn</Label>
                <Input
                  value={phase.phaseName}
                  onChange={handleNameChange}
                  className="font-medium"
                  placeholder="Nhập tên giai đoạn..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ngày bắt đầu</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          isToday(phase.startDate) ? "text-primary" : ""
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(phase.startDate, "EEEE, dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={phase.startDate}
                        onSelect={handleStartDateChange}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Ngày kết thúc</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          isToday(phase.endDate) ? "text-primary" : ""
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(phase.endDate, "EEEE, dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={phase.endDate}
                        onSelect={handleEndDateChange}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Giới hạn tối đa số điếu thuốc trong giai đoạn</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementMax}
                    disabled={phase.cigaretteBound <= 0}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={phase.cigaretteBound}
                    onChange={handleMaxCigarettesChange}
                    min={0}
                    className="w-20 text-center"
                  />
                  <Button variant="outline" size="icon" onClick={incrementMax}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <div className="flex flex-col text-xs text-muted-foreground">
                    <span>điếu tối đa</span>
                    <span>({phaseDurationDays} ngày)</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>
                      Trung bình: ~
                      {Math.round(
                        (phase.cigaretteBound / phaseDurationDays) * 10
                      ) / 10}{" "}
                      điếu/ngày
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mô tả giai đoạn</Label>
                <Textarea
                  placeholder="Mô tả chi tiết về giai đoạn này..."
                  value={phase.description}
                  onChange={handleDescriptionChange}
                  rows={2}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Mẹo và chiến lược ({phase.tips.length})</Label>
                  <Button variant="ghost" size="sm" onClick={addTip}>
                    <PlusCircle className="h-3.5 w-3.5 mr-1" />
                    Thêm
                  </Button>
                </div>

                <ul className="space-y-2">
                  {phase.tips.map((tip, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <div className="bg-primary/10 rounded-full p-1 mt-1.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <Input
                        value={tip.content}
                        onChange={(e) => updateTip(index, e.target.value)}
                        className="flex-1"
                        placeholder="Nhập mẹo hỗ trợ..."
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTip(index)}
                        className="h-9 w-9"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                  {phase.tips.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">
                      Thêm mẹo hỗ trợ để giúp bạn trong giai đoạn này
                    </p>
                  )}
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end border-t bg-gray-50/30">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deletePhase(phase.id)}
                disabled={isFirst && isLast}
              >
                <Trash2 className="mr-1.5 h-4 w-4" />
                Xóa giai đoạn
              </Button>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
