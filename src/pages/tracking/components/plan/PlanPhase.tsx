import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Trash2,
  Plus,
  Calendar,
  Target,
  Lightbulb,
  X,
  Check,
  Edit2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import type { PhaseFormData } from "@/types/models/phase";

interface PlanPhaseProps {
  phase: PhaseFormData;
  phaseIndex: number;
  updatePhase: (index: number, phaseUpdate: Partial<PhaseFormData>) => void;
  deletePhase: (index: number) => void;
  addTipToPhase: (phaseIndex: number, tipContent: string) => void;
  deleteTipFromPhase: (phaseIndex: number, tipIndex: number) => void;
  updateTipInPhase: (
    phaseIndex: number,
    tipIndex: number,
    newContent: string
  ) => void;
  isFirst: boolean;
  isLast: boolean;
  isCurrent: boolean;
  canDelete: boolean;
}

export default function PlanPhase({
  phase,
  phaseIndex,
  updatePhase,
  deletePhase,
  addTipToPhase,
  deleteTipFromPhase,
  updateTipInPhase,
  isFirst,
  isCurrent,
  canDelete,
}: PlanPhaseProps) {
  const [newTip, setNewTip] = useState("");
  const [editingTipIndex, setEditingTipIndex] = useState<number | null>(null);
  const [editingTipContent, setEditingTipContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(isCurrent); // Auto expand current phase

  const handleAddTip = () => {
    if (newTip.trim()) {
      addTipToPhase(phaseIndex, newTip);
      setNewTip("");
    }
  };

  const handleStartEditTip = (tipIndex: number, currentContent: string) => {
    setEditingTipIndex(tipIndex);
    setEditingTipContent(currentContent);
  };

  const handleSaveTip = () => {
    if (editingTipIndex !== null && editingTipContent.trim()) {
      updateTipInPhase(phaseIndex, editingTipIndex, editingTipContent);
      setEditingTipIndex(null);
      setEditingTipContent("");
    }
  };

  const handleCancelEditTip = () => {
    setEditingTipIndex(null);
    setEditingTipContent("");
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const calculateAveragePerDay = () => {
    const phaseDuration = differenceInDays(phase.endDate, phase.startDate) + 1;
    if (phaseDuration <= 0) return 0;
    return Math.round((phase.cigaretteBound / phaseDuration) * 10) / 10;
  };

  return (
    <Card
      className={`${
        isCurrent ? "border-primary shadow-lg" : "border-gray-200"
      } transition-all duration-200 hover:shadow-md`}
    >
      <CardHeader
        className="bg-gradient-to-r from-purple-50 to-blue-50 border-b cursor-pointer hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-colors"
        onClick={toggleExpand}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{phase.phaseName || `Giai đoạn ${phaseIndex + 1}`}</span>
          </CardTitle>

          <div className="flex items-center gap-2">
            {!isExpanded && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground mr-4">
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {phase.cigaretteBound} điếu tổng
                </span>
                <span className="flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  {phase.tips.length} mẹo
                </span>
                <span className="text-xs">
                  {format(phase.startDate, "dd/MM")} -{" "}
                  {format(phase.endDate, "dd/MM")}
                </span>
              </div>
            )}

            {canDelete && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePhase(phaseIndex);
                }}
                className="bg-red-500 text-red-200 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
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
            <CardContent className="p-6 space-y-6">
              {/* Phase Basic Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`phase-name-${phaseIndex}`}>
                      Tên giai đoạn
                    </Label>
                    <Input
                      id={`phase-name-${phaseIndex}`}
                      value={phase.phaseName}
                      onChange={(e) =>
                        updatePhase(phaseIndex, { phaseName: e.target.value })
                      }
                      placeholder="Nhập tên giai đoạn"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`phase-desc-${phaseIndex}`}>Mô tả</Label>
                    <Textarea
                      id={`phase-desc-${phaseIndex}`}
                      value={phase.description}
                      onChange={(e) =>
                        updatePhase(phaseIndex, { description: e.target.value })
                      }
                      placeholder="Mô tả mục tiêu và hoạt động của giai đoạn này"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${phaseIndex}`}>
                        Ngày bắt đầu
                      </Label>
                      <Input
                        id={`start-date-${phaseIndex}`}
                        type="date"
                        value={format(phase.startDate, "yyyy-MM-dd")}
                        onChange={(e) =>
                          updatePhase(phaseIndex, {
                            startDate: new Date(e.target.value),
                          })
                        }
                        disabled={!isFirst}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`end-date-${phaseIndex}`}>
                        Ngày kết thúc
                      </Label>
                      <Input
                        id={`end-date-${phaseIndex}`}
                        type="date"
                        value={format(phase.endDate, "yyyy-MM-dd")}
                        onChange={(e) =>
                          updatePhase(phaseIndex, {
                            endDate: new Date(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cigarette-bound-${phaseIndex}`}>
                      <Target className="h-4 w-4 inline mr-1" />
                      Tổng số điếu thuốc tối đa cho toàn phase
                    </Label>
                    <Input
                      id={`cigarette-bound-${phaseIndex}`}
                      type="number"
                      min="0"
                      value={phase.cigaretteBound}
                      onChange={(e) =>
                        updatePhase(phaseIndex, {
                          cigaretteBound: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="Tổng số điếu thuốc cho toàn bộ giai đoạn"
                    />

                    {/* Phase Statistics */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Thời gian giai đoạn:
                          </span>
                          <div className="font-medium">
                            {differenceInDays(phase.endDate, phase.startDate) +
                              1}{" "}
                            ngày
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Trung bình mỗi ngày:
                          </span>
                          <div className="font-medium text-blue-600">
                            {calculateAveragePerDay()} điếu/ngày
                          </div>
                        </div>
                      </div>

                      {phase.cigaretteBound > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <span className="text-xs text-muted-foreground">
                            💡 Tổng {phase.cigaretteBound} điếu trong{" "}
                            {differenceInDays(phase.endDate, phase.startDate) +
                              1}{" "}
                            ngày = Trung bình {calculateAveragePerDay()}{" "}
                            điếu/ngày
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    <Lightbulb className="h-4 w-4 inline mr-1" />
                    Mẹo và lời khuyên
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {phase.tips.length} mẹo
                  </span>
                </div>

                {/* Existing Tips */}
                <div className="space-y-2">
                  {phase.tips.map((tip, tipIndex) => (
                    <div
                      key={tipIndex}
                      className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border"
                    >
                      <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      {editingTipIndex === tipIndex ? (
                        <div className="flex-1 space-y-2">
                          <Input
                            value={editingTipContent}
                            onChange={(e) =>
                              setEditingTipContent(e.target.value)
                            }
                            placeholder="Nhập mẹo hữu ích..."
                            className="bg-white"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSaveTip}>
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCancelEditTip}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1 text-sm">{tip.content}</span>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleStartEditTip(tipIndex, tip.content)
                              }
                              className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-100"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                deleteTipFromPhase(phaseIndex, tipIndex)
                              }
                              className="h-6 w-6 p-0 text-red-600 hover:bg-red-100"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add New Tip */}
                <div className="flex gap-2">
                  <Input
                    value={newTip}
                    onChange={(e) => setNewTip(e.target.value)}
                    placeholder="Thêm mẹo mới..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddTip()}
                  />
                  <Button onClick={handleAddTip} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
