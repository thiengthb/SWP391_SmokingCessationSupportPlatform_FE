import useApi from "@/hooks/useApi";
import {
  Language,
  MotivationFrequency,
  Theme,
  TrackingMode,
  type Setting,
} from "@/types/setting";
import { useAuth } from "./AuthContext";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useTheme } from "@/components/theme/theme-provider";
import i18n from "@/lib/i18n";

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
  trackingMode: TrackingMode.AUTO_COUNT,
  motivationFrequency: MotivationFrequency.DAILY,
  reportDeadline: "19:00",
};

const SettingContext = createContext<SettingContext>({} as SettingContext);

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const { auth } = useAuth();
  const apiWithInterceptors = useApi();

  const [setting, setSetting] = useState<Setting>(defaultSetting);
  const { setTheme } = useTheme();

  useEffect(() => {
    const fetchSetting = async () => {
      if (auth.accessToken) {
        try {
          const response = await apiWithInterceptors.get(
            `/v1/settings/${auth.currentUser?.id}`
          );
          console.log("Fetched settings:", response.data.result);
          setSetting(response.data.result);
        } catch (error) {
          console.error("Error fetching settings:", error);
        }
      }
    };

    fetchSetting();
  }, [auth.accessToken]);

  const handleChangeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setSetting((prev) => ({ ...prev, theme: newTheme }));
  };

  const handleChangeLanguage = (newLanguage: Language) => {
    i18n.changeLanguage(newLanguage.toLowerCase());
    localStorage.setItem("language", newLanguage.toLowerCase());
    setSetting((prev) => ({ ...prev, language: newLanguage }));
  };

  const handleChangeTrackingMode = (newTrackingMode: TrackingMode) => {
    setSetting((prev) => ({ ...prev, trackingMode: newTrackingMode }));
  };

  const handleChangeMotivationFrequency = (
    newFrequency: MotivationFrequency
  ) => {
    setSetting((prev) => ({ ...prev, motivationFrequency: newFrequency }));
  };

  const handleChangeReportDeadline = (newDeadline: string) => {
    setSetting((prev) => ({ ...prev, reportDeadline: newDeadline }));
  };

  useEffect(() => {
    const handleSaveSetting = async () => {
      if (auth.accessToken) {
        try {
          await apiWithInterceptors.put(
            `/v1/settings/${auth.currentUser?.id}`,
            setting
          );
          toast.success("Settings saved successfully!");
        } catch (error) {
          console.error("Error saving settings:", error);
        }
      } else {
        toast.error("You need to be logged in to save settings.");
      }
    };
    handleSaveSetting();
  }, [setting]);

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
