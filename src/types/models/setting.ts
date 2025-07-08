import type { Language } from "../enums/Language";
import type { MotivationFrequency } from "../enums/MotivationFrequency";
import type { Theme } from "../enums/Theme";
import type { TrackingMode } from "../enums/TrackingMode";

export interface Setting {
    theme: Theme;
    language: Language;
    trackingMode: TrackingMode;
    motivationFrequency: MotivationFrequency;
    reportDeadline: string;
}