import { Check, Globe, Moon, Monitor, Sun } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/types/enums/Language";
import { Theme } from "@/types/enums/Theme"

interface AppearanceSettingsProps {
  theme: Theme;
  language: Language;
  onChangeTheme: (theme: Theme) => void;
  onChangeLanguage: (language: Language) => void;
}

export function AppearanceSettings({
  theme,
  language,
  onChangeTheme,
  onChangeLanguage,
}: AppearanceSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base">Giao diện</Label>
        <div className="grid grid-cols-3 gap-4">
          <div
            className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary transition-colors ${
              theme === Theme.LIGHT
                ? "border-primary bg-primary/5"
                : "border-muted"
            }`}
            onClick={() => onChangeTheme(Theme.LIGHT)}
          >
            <Sun className="h-5 w-5" />
            <span>Sáng</span>
            {theme === Theme.LIGHT && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
          <div
            className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary transition-colors ${
              theme === Theme.DARK
                ? "border-primary bg-primary/5"
                : "border-muted"
            }`}
            onClick={() => onChangeTheme(Theme.DARK)}
          >
            <Moon className="h-5 w-5" />
            <span>Tối</span>
            {theme === Theme.DARK && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
          <div
            className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary transition-colors ${
              theme === Theme.SYSTEM
                ? "border-primary bg-primary/5"
                : "border-muted"
            }`}
            onClick={() => onChangeTheme(Theme.SYSTEM)}
          >
            <Monitor className="h-5 w-5" />
            <span>Hệ thống</span>
            {theme === Theme.SYSTEM && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Ngôn ngữ</Label>
        <Select value={language} onValueChange={onChangeLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Language.EN}>
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                <span>English</span>
              </div>
            </SelectItem>
            <SelectItem value={Language.VI}>
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                <span>Tiếng Việt</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
