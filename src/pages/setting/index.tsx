import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { useSetting } from "@/contexts/SettingContext";
import {
  Language,
  MotivationFrequency,
  Theme,
  TrackingMode,
} from "@/types/setting";

export default function SettingsPage() {
  const {
    setting,
    handleChangeTheme,
    handleChangeLanguage,
    handleChangeTrackingMode,
    handleChangeMotivationFrequency,
    handleChangeReportDeadline,
  } = useSetting();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Manage your application preferences and notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Theme</Label>
          <Select value={setting.theme} onValueChange={handleChangeTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Theme.LIGHT}>Light</SelectItem>
              <SelectItem value={Theme.DARK}>Dark</SelectItem>
              <SelectItem value={Theme.SYSTEM}>System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={setting.language} onValueChange={handleChangeLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Language.EN}>English</SelectItem>
              <SelectItem value={Language.VI}>Tiếng Việt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Email Notification Frequency</Label>
          <Select
            value={setting.motivationFrequency}
            onValueChange={handleChangeMotivationFrequency}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={MotivationFrequency.NEVER}>Never</SelectItem>
              <SelectItem value={MotivationFrequency.EVERY_6_HOURS}>
                Every 6 hours
              </SelectItem>
              <SelectItem value={MotivationFrequency.EVERY_12_HOURS}>
                Every 12 hours
              </SelectItem>
              <SelectItem value={MotivationFrequency.DAILY}>Daily</SelectItem>
              <SelectItem value={MotivationFrequency.WEEKLY}>Weekly</SelectItem>
              <SelectItem value={MotivationFrequency.MONTHLY}>
                Monthly
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tracking Mode</Label>
          <Select
            value={setting.trackingMode}
            onValueChange={handleChangeTrackingMode}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tracking mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TrackingMode.AUTO_COUNT}>Counter</SelectItem>
              <SelectItem value={TrackingMode.DAILY_RECORD}>
                Daily Tracking
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Daily Deadline</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !setting.reportDeadline && "text-muted-foreground"
                )}
              >
                <Clock className="mr-2 h-4 w-4" />
                {setting.reportDeadline
                  ? format(
                      new Date(`2000/01/01 ${setting.reportDeadline}`),
                      "p"
                    )
                  : "Pick a time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Select
                value={setting.reportDeadline}
                onValueChange={handleChangeReportDeadline}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select deadline" />
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
      </CardContent>
    </Card>
  );
}
