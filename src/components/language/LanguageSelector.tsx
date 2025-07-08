import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import i18n from "@/lib/i18n";
import { Language } from "@/types/enums/Language";

interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { value: Language.VI, label: "Tiếng Việt", flag: "🇻🇳" },
  { value: Language.EN, label: "English", flag: "🇺🇸" },
];

interface LanguageSelectorProps {
  variant?: "default" | "compact" | "mobile";
  showLabel?: boolean;
}

export default function LanguageSelector({
  variant = "default",
  showLabel = true,
}: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.VI);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      const lang = savedLanguage.toUpperCase() as Language;
      setCurrentLanguage(lang);
    }
  }, []);

  const handleChangeLanguage = (language: Language) => {
    i18n.changeLanguage(language.toLowerCase());
    localStorage.setItem("language", language.toLowerCase());
    setCurrentLanguage(language);
  };

  const getCurrentLanguage = () => {
    return (
      languages.find((lang) => lang.value === currentLanguage) || languages[0]
    );
  };

  const getButtonContent = () => {
    const current = getCurrentLanguage();

    switch (variant) {
      case "compact":
        return (
          <>
            <span className="text-xs font-medium">{current.label}</span>
          </>
        );
      case "mobile":
        return (
          <>
            <Globe className="h-4 w-4" />
            <span>{current.label}</span>
          </>
        );
      default:
        return (
          <>
            <Globe className="h-4 w-4" />
            {showLabel && (
              <span className="hidden sm:inline">{current.label}</span>
            )}
          </>
        );
    }
  };

  const getButtonClasses = () => {
    switch (variant) {
      case "compact":
        return "h-8 px-2 gap-1";
      case "mobile":
        return "w-full justify-start gap-2";
      default:
        return "gap-2";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size={variant === "compact" ? "sm" : "default"}
          className={getButtonClasses()}
        >
          {getButtonContent()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => {
          const isSelected = currentLanguage === language.value;

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
