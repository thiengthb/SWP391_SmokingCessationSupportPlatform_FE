import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import useApi from "@/hooks/useApi";
import { Role } from "@/types/user/user";
import { ftndLevels } from "@/components/ftnd/ftndData";

interface FTNDContextType {
  showFTNDAssessment: boolean;
  hasCompletedFTND: boolean;
  assessmentResults: Record<number, number> | null;
  cigarettesPerDay: number;
  cigarettesPerPack: number;
  packPrice: number;
  ftndLevel: number;
  smokeYear: number;
  reasonToQuit: string;
  setShowFTNDAssessment: React.Dispatch<React.SetStateAction<boolean>>;
  setHasCompletedFTND: React.Dispatch<React.SetStateAction<boolean>>;
  setAssessmentResults: (results: Record<number, number>) => void;
  setCigarettesPerDay: (value: number) => void;
  setCigarettesPerPack: (value: number) => void;
  setPackPrice: (value: number) => void;
  setFtndLevel: (value: number) => void;
  setSmokeYear: (value: number) => void;
  setReasonToQuit: (value: string) => void;
  giveFtndLevelGuide: (level: number) => {
    description: string;
    advice: string;
  };
}

const FTNDContext = createContext<FTNDContextType | undefined>(undefined);

export const FTNDProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showFTNDAssessment, setShowFTNDAssessment] = useState(false);
  const [hasCompletedFTND, setHasCompletedFTND] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<Record<
    number,
    number
  > | null>(null);

  const [cigarettesPerDay, setCigarettesPerDay] = useState(0);
  const [cigarettesPerPack, setCigarettesPerPack] = useState(0);
  const [packPrice, setPackPrice] = useState(0);
  const [ftndLevel, setFtndLevel] = useState(0);
  const [smokeYear, setSmokeYear] = useState(0);
  const [reasonToQuit, setReasonToQuit] = useState("");

  const { auth } = useAuth();
  const apiWithInterceptors = useApi();

  useEffect(() => {
    const checkFTNDStatus = async () => {
      if (auth?.accessToken && auth?.currentUser?.role === Role.MEMBER) {
        try {
          const response = await apiWithInterceptors.get(
            "/v1/healths/ftnd-status"
          );
          console.log("FTND status response:", response);
          setHasCompletedFTND(response.data.result);

          if (!response.data.result) {
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

  return (
    <FTNDContext.Provider
      value={{
        showFTNDAssessment,
        hasCompletedFTND,
        assessmentResults,
        cigarettesPerDay,
        cigarettesPerPack,
        packPrice,
        ftndLevel,
        smokeYear,
        reasonToQuit,
        setShowFTNDAssessment,
        setHasCompletedFTND,
        setAssessmentResults,
        setCigarettesPerDay,
        setCigarettesPerPack,
        setPackPrice,
        setFtndLevel,
        setSmokeYear,
        setReasonToQuit,
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
