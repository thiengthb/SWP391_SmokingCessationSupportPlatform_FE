import { useAuth } from "./AuthContext";
import { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import i18n from "@/lib/i18n";
import type { Setting } from "@/types/models/setting";
import { Theme } from "@/types/enums/Theme";
import { Language } from "@/types/enums/Language";
import { TrackingMode } from "@/types/enums/TrackingMode";
import { MotivationFrequency } from "@/types/enums/MotivationFrequency";
import { updateSetting } from "@/services/api/setting.service";
import { useSettingSwr } from "@/hooks/swr/useSettingSwr";

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
  const { setTheme } = useTheme();
  const { setting } = useSettingSwr(auth.currentAcc?.id || "");
  const [settingData, setSettingData] = useState<Setting>(
    setting || defaultSetting
  );

  const handleChangeTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme.toLowerCase());
    setSettingData((prev) => ({ ...prev, theme: newTheme }));
  };

  const handleChangeLanguage = async (newLanguage: Language) => {
    i18n.changeLanguage(newLanguage.toLowerCase());
    localStorage.setItem("language", newLanguage.toLowerCase());
    setSettingData((prev) => ({ ...prev, language: newLanguage }));
  };

  const handleChangeTrackingMode = async (newTrackingMode: TrackingMode) => {
    setSettingData((prev) => ({ ...prev, trackingMode: newTrackingMode }));
  };

  const handleChangeMotivationFrequency = async (
    newFrequency: MotivationFrequency
  ) => {
    setSettingData((prev) => ({ ...prev, motivationFrequency: newFrequency }));
  };

  const handleChangeReportDeadline = async (newDeadline: string) => {
    setSettingData((prev) => ({ ...prev, reportDeadline: newDeadline }));
  };

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.currentAcc) {
      console.warn("User is not authenticated, skipping setting fetch.");
      setSettingData(defaultSetting);
      return;
    }
    updateSetting(auth.currentAcc.id, settingData);
  }, [settingData]);

  return (
    <SettingContext.Provider
      value={{
        setting: settingData,
        setSetting: setSettingData,
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
