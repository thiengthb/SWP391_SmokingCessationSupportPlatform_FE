import { useSetting } from "@/contexts/SettingContext";
import RecordHabbitPage from "./RecordHabbitPage";
import AutoTrackingPage from "./AutoTrackingPage";
import { TrackingMode } from "@/types/enums/TrackingMode";

export default function MemberHome() {
  const { setting } = useSetting();

  return (
    <div className="space-y-6">
      {setting.trackingMode === TrackingMode.AUTO_COUNT ? (
        <AutoTrackingPage />
      ) : (
        <RecordHabbitPage />
      )}
    </div>
  );
}
