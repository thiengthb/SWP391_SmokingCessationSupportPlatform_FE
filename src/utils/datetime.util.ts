import i18n from "@/lib/i18n";
import { format, isValid } from "date-fns";
import { vi } from 'date-fns/locale';
export const formatDurationDisplay = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds} giây`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes} phút ${
        remainingSeconds > 0 ? `${remainingSeconds} giây` : ""
      }`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      return `${hours} giờ ${
        remainingMinutes > 0 ? `${remainingMinutes} phút` : ""
      }`;
    }
};

export const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
    ].join(":");
};

export const formatDateTime = (date: Date) => {
    return format(date, "HH:mm:ss - dd/MM/yyyy", { locale: i18n.language === "vi" ? vi : undefined });;
};

export const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy", { locale: i18n.language === "vi" ? vi : undefined });
};

export const getNowDate = () => {
    return format(new Date(), "EEEE, dd/MM", { locale: i18n.language === "vi" ? vi : undefined });
}

export const safeFormat = (date: Date | string | null | undefined, formatString: string, options?: any) => {
  if (!date) return "N/A";
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (!isValid(dateObj)) {
    console.warn("Invalid date provided to safeFormat:", date);
    return "Invalid Date";
  }
  
  try {
    return format(dateObj, formatString, { locale: vi, ...options });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Format Error";
  }
};

export const parseApiDate = (dateString: string | null | undefined): Date | null => {
  if (!dateString) return null;
  
  const parsed = new Date(dateString);
  return isValid(parsed) ? parsed : null;
};