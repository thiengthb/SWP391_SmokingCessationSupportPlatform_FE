import { Calendar, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MotivationFrequency } from "@/types/models/setting";

interface NotificationSettingsProps {
  motivationFrequency: MotivationFrequency;
  haveNotification: boolean;
  onChangeMotivationFrequency: (frequency: MotivationFrequency) => void;
  onToggleEmailNotifications: (checked: boolean) => void;
}

export function NotificationSettings({
  motivationFrequency,
  haveNotification,
  onChangeMotivationFrequency,
  onToggleEmailNotifications,
}: NotificationSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Thông báo qua email</Label>
          <p className="text-sm text-muted-foreground">
            Nhận email động viên trong hành trình cai thuốc lá
          </p>
        </div>
        <Switch
          checked={haveNotification}
          onCheckedChange={onToggleEmailNotifications}
        />
      </div>

      {haveNotification && (
        <div className="space-y-2 rounded-lg border p-4">
          <Label>Tần suất nhận thông báo</Label>
          <Select
            value={motivationFrequency}
            onValueChange={onChangeMotivationFrequency}
            disabled={!haveNotification}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn tần suất" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={MotivationFrequency.DAILY}>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Hàng ngày</span>
                </div>
              </SelectItem>
              <SelectItem value={MotivationFrequency.EVERY_12_HOURS}>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Mỗi 12 giờ</span>
                </div>
              </SelectItem>
              <SelectItem value={MotivationFrequency.EVERY_6_HOURS}>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Mỗi 6 giờ</span>
                </div>
              </SelectItem>
              <SelectItem value={MotivationFrequency.WEEKLY}>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Hàng tuần</span>
                </div>
              </SelectItem>
              <SelectItem value={MotivationFrequency.MONTHLY}>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Hàng tháng</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
