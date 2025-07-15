import React from "react";
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
} from "lucide-react";
import type { Phase } from "@/types/models/Plan";

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

  const handleCigaretteBoundChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      updatePhase(phase.id, { cigaretteBound: value });
    }
  };

  const incrementTarget = () => {
    updatePhase(phase.id, { cigaretteBound: phase.cigaretteBound + 1 });
  };

  const decrementTarget = () => {
    if (phase.cigaretteBound > 0) {
      updatePhase(phase.id, { cigaretteBound: phase.cigaretteBound - 1 });
    }
  };

  const toggleCompleted = () => {
    updatePhase(phase.id, { completed: !phase.completed });
  };

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
    <Card className={`${isCurrent ? "border-primary" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <Input
              value={phase.phaseName}
              onChange={handleNameChange}
              className="text-xl font-semibold h-auto py-1 border-none focus-visible:ring-1"
            />
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
          <p className="text-sm text-muted-foreground">
            Giai đoạn {phaseIndex + 1}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-2 space-y-4">
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
                  {format(phase.startDate, "EEEE, dd/MM/yyyy", { locale: vi })}
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
                  {format(phase.endDate, "EEEE, dd/MM/yyyy", { locale: vi })}
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
          <Label>Mục tiêu số điếu thuốc mỗi ngày</Label>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementTarget}
              disabled={phase.cigaretteBound <= 0}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={phase.cigaretteBound}
              onChange={handleCigaretteBoundChange}
              min={0}
              className="mx-2 w-20 text-center"
            />
            <Button variant="outline" size="icon" onClick={incrementTarget}>
              <PlusCircle className="h-4 w-4" />
            </Button>
            <span className="ml-3 text-muted-foreground">điếu/ngày</span>
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
            <Label>Mẹo và chiến lược</Label>
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

      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={toggleCompleted}>
          {phase.completed ? (
            <>
              <X className="mr-1.5 h-4 w-4" />
              Đánh dấu chưa hoàn thành
            </>
          ) : (
            <>
              <Check className="mr-1.5 h-4 w-4" />
              Đánh dấu hoàn thành
            </>
          )}
        </Button>

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
    </Card>
  );
}
