import { Calendar, Check, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrackingMode } from "@/types/models/setting";
import { Separator } from "@/components/ui/separator";

interface TrackingSettingsProps {
  trackingMode: TrackingMode;
  reportDeadline: string;
  onChangeTrackingMode: (mode: TrackingMode) => void;
  onChangeReportDeadline: (deadline: string) => void;
}

export function TrackingSettings({
  trackingMode,
  reportDeadline,
  onChangeTrackingMode,
  onChangeReportDeadline,
}: TrackingSettingsProps) {
  const trackingOptions = [
    {
      id: TrackingMode.AUTO_COUNT,
      title: "Đếm thời gian",
      description: "Theo dõi thời gian từ lần hút thuốc cuối cùng",
      icon: <Clock className="h-8 w-8 text-primary" />,
    },
    {
      id: TrackingMode.DAILY_RECORD,
      title: "Ghi chép hàng ngày",
      description: "Ghi lại số lượng thuốc lá hút mỗi ngày",
      icon: <Calendar className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base">Chế độ theo dõi</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trackingOptions.map((option) => (
            <div
              key={option.id}
              className={`relative border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${
                trackingMode === option.id
                  ? "border-primary bg-primary/5"
                  : "border-muted"
              }`}
              onClick={() => onChangeTrackingMode(option.id)}
            >
              <div className="flex gap-3">
                <div
                  className={`w-12 h-12 rounded-full p-2 flex items-center justify-center ${
                    trackingMode === option.id ? "bg-primary/20" : "bg-muted"
                  }`}
                >
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-medium mb-1">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
              {trackingMode === option.id && (
                <div className="absolute top-3 right-3">
                  <Check className="h-5 w-5 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label className="text-base">Thời hạn báo cáo hàng ngày</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Đặt thời gian cuối ngày để nhắc nhở bạn cập nhật số liệu hút thuốc
        </p>

        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !reportDeadline && "text-muted-foreground"
                )}
              >
                <Clock className="mr-2 h-4 w-4" />
                {reportDeadline
                  ? format(new Date(`2000/01/01 ${reportDeadline}`), "p")
                  : "Chọn thời gian"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Select
                value={reportDeadline}
                onValueChange={onChangeReportDeadline}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, "0");
                    return (
                      <SelectItem key={hour} value={`${hour}:00`}>
                        {format(new Date(`2000/01/01 ${hour}:00`), "p")}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
