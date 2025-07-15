import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { ftndLevels } from "@/data/ftnd.data";
import { Role } from "@/types/enums/Role";
import { defaultHealthValue, type Health } from "@/types/models/health";
import { healthService } from "@/services/api/heath.service";

interface FTNDContextType {
  showFTNDAssessment: boolean;
  hasCompletedFTND: boolean;
  healthData: Health;
  setShowFTNDAssessment: React.Dispatch<React.SetStateAction<boolean>>;
  setHasCompletedFTND: React.Dispatch<React.SetStateAction<boolean>>;
  setHealthData: React.Dispatch<React.SetStateAction<Health>>;
  giveFtndLevelGuide: (level: number) => {
    description: string;
    advice: string;
  };
}

const FTNDContext = createContext<FTNDContextType | undefined>(undefined);

export const FTNDProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth } = useAuth();

  const [showFTNDAssessment, setShowFTNDAssessment] = useState(false);
  const [hasCompletedFTND, setHasCompletedFTND] = useState<boolean>(false);
  const [healthData, setHealthData] = useState<Health>(defaultHealthValue);

  useEffect(() => {
    if (!auth?.accessToken || auth?.currentAcc?.role !== Role.MEMBER) {
      console.warn(
        "User is not authenticated or not a member, skipping FTND check."
      );
      return;
    }

    const checkFTNDStatus = async () => {
      if (auth?.accessToken && auth?.currentAcc?.role === Role.MEMBER) {
        try {
          const data = await healthService.getHealthFntdStatus();
          setHasCompletedFTND(data);

          if (!data) {
            const timer = setTimeout(() => {
              setShowFTNDAssessment(true);
            }, 3000);

            return () => clearTimeout(timer);
          }
        } catch (error) {
          console.error("Error checking FTND status:", error);
        }
      }
    };

    checkFTNDStatus();
  }, [auth?.accessToken]);

  const giveFtndLevelGuide = (level: number) => {
    const ftndLevel = ftndLevels.find((l) => l.level === level);
    if (ftndLevel) {
      return {
        description: ftndLevel.description,
        advice: ftndLevel.advice,
      };
    }
    return { description: "Unknown level", advice: "No advice available" };
  };

  useEffect(() => {
    if (!auth?.accessToken || !hasCompletedFTND) {
      console.warn("User is not authenticated or has not completed FTND.");
      setHealthData(defaultHealthValue);
      return;
    }

    const fetchHealthData = async () => {
      if (auth?.accessToken && auth?.currentAcc?.role === Role.MEMBER) {
        try {
          const data = await healthService.getMyHealth();
          console.log("Fetched health data:", data);
          setHealthData(data);
        } catch (error) {
          console.error("Failed to fetch health data:", error);
          setHealthData(defaultHealthValue);
        }
      }
    };

    fetchHealthData();
  }, [auth?.accessToken, hasCompletedFTND]);

  return (
    <FTNDContext.Provider
      value={{
        showFTNDAssessment,
        hasCompletedFTND,
        healthData,
        setShowFTNDAssessment,
        setHasCompletedFTND,
        setHealthData,
        giveFtndLevelGuide,
      }}
    >
      {children}
    </FTNDContext.Provider>
  );
};

export const useFTND = () => {
  const context = useContext(FTNDContext);
  if (context === undefined) {
    throw new Error("useFTND must be used within an FTNDProvider");
  }
  return context;
};
