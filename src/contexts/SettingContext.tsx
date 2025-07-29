import { useAuth } from "./AuthContext";
import { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import i18n from "@/lib/i18n";
import type { Setting } from "@/types/models/setting";
import { Theme } from "@/types/enums/Theme";
import { Language } from "@/types/enums/Language";
import { TrackingMode } from "@/types/enums/TrackingMode";
import { MotivationFrequency } from "@/types/enums/MotivationFrequency";
import { useSettingSwr } from "@/hooks/swr/useSettingSwr";
import { toast } from "sonner";
import useApi from "@/hooks/useApi";

export interface SettingContext {
  setting: Setting;
  setSetting: React.Dispatch<React.SetStateAction<Setting>>;
  handleChangeTheme: (newTheme: Theme) => void;
  handleChangeLanguage: (newLanguage: Language) => void;
  handleChangeTrackingMode: (newTrackingMode: TrackingMode) => void;
  handleChangeMotivationFrequency: (newFrequency: MotivationFrequency) => void;
  handleChangeReportDeadline: (newDeadline: string) => void;
}

const defaultSetting: Setting = {
  theme: Theme.SYSTEM,
  language: Language.EN,
  trackingMode: TrackingMode.DAILY_RECORD,
  motivationFrequency: MotivationFrequency.DAILY,
  reportDeadline: "19:00",
};

const SettingContext = createContext<SettingContext>({} as SettingContext);

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const { auth } = useAuth();
  const apiWithInterceptors = useApi();

  const { setting: fetchedSetting } = useSettingSwr(auth.currentAcc?.id || "");
  const [setting, setSetting] = useState<Setting>(
    fetchedSetting || defaultSetting
  );
  const [hasUserChangedSetting, setHasUserChangedSetting] = useState(false);
  const { setTheme } = useTheme();

  const handleChangeTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme.toLowerCase());
    setSetting((prev) => ({ ...prev, theme: newTheme }));
    setHasUserChangedSetting(true);
  };

  const handleChangeLanguage = async (newLanguage: Language) => {
    i18n.changeLanguage(newLanguage.toLowerCase());
    localStorage.setItem("language", newLanguage.toLowerCase());
    setSetting((prev) => ({ ...prev, language: newLanguage }));
    setHasUserChangedSetting(true);
  };

  const handleChangeTrackingMode = async (newTrackingMode: TrackingMode) => {
    setSetting((prev) => ({ ...prev, trackingMode: newTrackingMode }));
    setHasUserChangedSetting(true);
  };

  const handleChangeMotivationFrequency = async (
    newFrequency: MotivationFrequency
  ) => {
    setSetting((prev) => ({ ...prev, motivationFrequency: newFrequency }));
    setHasUserChangedSetting(true);
  };

  const handleChangeReportDeadline = async (newDeadline: string) => {
    setSetting((prev) => ({ ...prev, reportDeadline: newDeadline }));
    setHasUserChangedSetting(true);
  };

  useEffect(() => {
    if (!hasUserChangedSetting) return;

    const handleSaveSetting = async () => {
      if (auth.accessToken) {
        try {
          await apiWithInterceptors.put(
            `/v1/settings/${auth.currentAcc?.id}`,
            setting
          );
          toast.success("Settings saved successfully!");
          console.log("Settings saved:", setting);
        } catch (error) {
          console.error("Error saving settings:", error);
          toast.error("Failed to save settings. Please try again later.");
        }
      } else {
        toast.error("You need to be logged in to save settings.");
      }
    };
    handleSaveSetting();
  }, [setting, hasUserChangedSetting]);

  useEffect(() => {
    if (fetchedSetting) {
      setSetting(fetchedSetting);
    }
  }, [fetchedSetting]);

  return (
    <SettingContext.Provider
      value={{
        setting,
        setSetting,
        handleChangeTheme,
        handleChangeLanguage,
        handleChangeTrackingMode,
        handleChangeMotivationFrequency,
        handleChangeReportDeadline,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export const useSetting = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSetting must be used within a SettingProvider");
  }
  return context;
};
