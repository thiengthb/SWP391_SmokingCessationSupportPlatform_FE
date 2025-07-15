import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Settings, Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import i18n from "@/lib/i18n";
import { useTranslate } from "@/hooks/useTranslate";
import { Language } from "@/types/enums/Language";
import { Theme } from "@/types/enums/Theme";

interface AppearanceSettings {
  theme: Theme;
  language: Language;
}

const themes = [
  { value: Theme.LIGHT, label: "Light", icon: Sun },
  { value: Theme.DARK, label: "Dark", icon: Moon },
  { value: Theme.SYSTEM, label: "System", icon: Monitor },
];

const languages = [
  { value: Language.VI, label: "Tiếng Việt", flag: "🇻🇳" },
  { value: Language.EN, label: "English", flag: "🇺🇸" },
];

export default function AppearanceSetting() {
  const { tNavbar} = useTranslate();
  const { setTheme } = useTheme();

  const [settings, setSettings] = useState<AppearanceSettings>({
    theme: Theme.SYSTEM,
    language: Language.VI,
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language");

    const currentSettings: AppearanceSettings = {
      theme: savedTheme ? (savedTheme.toUpperCase() as Theme) : Theme.SYSTEM,
      language: savedLanguage
        ? (savedLanguage.toUpperCase() as Language)
        : Language.VI,
    };

    setSettings(currentSettings);
  }, []);

  const handleChangeTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme.toLowerCase());
    setSettings((prev) => ({ ...prev, theme: newTheme }));
  };

  const handleChangeLanguage = async (newLanguage: Language) => {
    i18n.changeLanguage(newLanguage.toLowerCase());
    localStorage.setItem("language", newLanguage.toLowerCase());
    setSettings((prev) => ({ ...prev, language: newLanguage }));
  };

  const getCurrentThemeLabel = () => {
    const themeItem = themes.find((t) => t.value === settings.theme);
    return themeItem?.label || "System";
  };

  const getCurrentLanguageLabel = () => {
    const languageItem = languages.find((l) => l.value === settings.language);
    return languageItem?.label || "Tiếng Việt";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="gap-2">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-semibold">
           {tNavbar("navbar.settings.title")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {tNavbar("navbar.settings.theme.title")}
        </DropdownMenuLabel>
        {themes.map((themeItem) => {
          const IconComponent = themeItem.icon;
          const isSelected = settings.theme === themeItem.value;

          return (
            <DropdownMenuItem
              key={themeItem.value}
              onClick={() => handleChangeTheme(themeItem.value)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <IconComponent className="h-4 w-4" />
                <span>{themeItem.label}</span>
              </div>
              {isSelected && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {tNavbar("navbar.settings.language.title")}
        </DropdownMenuLabel>
        {languages.map((language) => {
          const isSelected = settings.language === language.value;

          return (
            <DropdownMenuItem
              key={language.value}
              onClick={() => handleChangeLanguage(language.value)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg pb-1">{language.flag}</span>
                <span>{language.label}</span>
              </div>
              {isSelected && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          <div className="flex items-center justify-between mb-1">
            <span>{tNavbar("navbar.settings.theme.title")}:</span>
            <Badge variant="secondary" className="text-xs">
              {getCurrentThemeLabel()}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>{tNavbar("navbar.settings.language.title")}:</span>
            <Badge variant="secondary" className="text-xs">
              {getCurrentLanguageLabel()}
            </Badge>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
