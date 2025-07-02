import i18n from "@/lib/i18n";
import { format } from "date-fns";
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