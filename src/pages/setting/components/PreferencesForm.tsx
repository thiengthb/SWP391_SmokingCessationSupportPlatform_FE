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
import { useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Clock } from "lucide-react";

export function PreferencesForm() {
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState("en");
  const [frequency, setFrequency] = useState("daily");
  const [trackingMode, setTrackingMode] = useState("counter");
  const [deadline, setDeadline] = useState<string>("22:00");

  const handleSave = () => {
    console.log({ theme, language, frequency, trackingMode, deadline });
  };

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
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Email Notification Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="6hour">Every 6 hours</SelectItem>
              <SelectItem value="12hour">Every 12 hours</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tracking Mode</Label>
          <Select value={trackingMode} onValueChange={setTrackingMode}>
            <SelectTrigger>
              <SelectValue placeholder="Select tracking mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="counter">Counter</SelectItem>
              <SelectItem value="dailytraking">Daily Tracking</SelectItem>
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
                  !deadline && "text-muted-foreground"
                )}
              >
                <Clock className="mr-2 h-4 w-4" />
                {deadline ? format(new Date(`2000/01/01 ${deadline}`), 'p') : "Pick a time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Select value={deadline} onValueChange={setDeadline}>
                <SelectTrigger>
                  <SelectValue placeholder="Select deadline" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, '0');
                    return (
                      <SelectItem key={hour} value={`${hour}:00`}>
                        {format(new Date(`2000/01/01 ${hour}:00`), 'p')}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save preferences
        </Button>
      </CardContent>
    </Card>
  );
}
