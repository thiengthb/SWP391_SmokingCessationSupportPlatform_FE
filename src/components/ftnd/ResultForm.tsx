import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  getFtndLevelDescription,
  getFtndLevelText,
} from "../../data/ftnd.data";
import { Paths } from "@/constants/path";

interface FTNDAssessmentFormProps {
  open: boolean;
  ftndScore: number;
  onOpenChange: (open: boolean) => void;
  setShowCompletionDialog?: (open: boolean) => void;
}

export const ResultForm = ({
  open,
  ftndScore,
  onOpenChange,
  setShowCompletionDialog = () => {},
}: FTNDAssessmentFormProps) => {
  const navigation = useNavigate();

  const handleCloseAssessment = () => {
    setShowCompletionDialog(false);
    onOpenChange(false);
  };

  const handleNavigateToPricing = () => {
    handleCloseAssessment();
    navigation(Paths.PUBLIC.PRICING);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Đánh giá hoàn tất
          </DialogTitle>
          <DialogDescription>
            Cảm ơn bạn đã hoàn thành bài đánh giá phụ thuộc nicotin
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Điểm FTND của bạn
            </p>
            <p className="text-4xl font-bold text-primary">{ftndScore}</p>
            <p className="font-medium mt-2">{getFtndLevelText(ftndScore)}</p>
          </div>

          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Đề xuất của chúng tôi</p>
              <p>{getFtndLevelDescription(ftndScore)}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
          <Button variant="outline" onClick={handleCloseAssessment}>
            Đóng
          </Button>
          <Button onClick={handleNavigateToPricing} className="gap-2">
            Xem các gói hỗ trợ
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
