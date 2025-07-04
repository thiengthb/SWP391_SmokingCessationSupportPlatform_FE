import { useSetting } from "@/contexts/SettingContext";
import { TrackingMode } from "@/types/models/setting";
import RecordHabbitPage from "./RecordHabbitPage";
import AutoTrackingPage from "./AutoTrackingPage";

export default function MemberHome() {
  const { setting } = useSetting();

  return (
    <>
      {setting.trackingMode === TrackingMode.AUTO_COUNT ? (
        <AutoTrackingPage />
      ) : (
        <RecordHabbitPage />
      )}
    </>
  );
}
