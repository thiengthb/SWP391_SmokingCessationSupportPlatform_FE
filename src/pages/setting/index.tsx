import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSetting } from "@/contexts/SettingContext";
import { MotivationFrequency } from "@/types/models/setting";
import { AnimatePresence, motion } from "framer-motion";

// Import các component con
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingSidebar } from "./components/SettingSidebar";
import { AppearanceSettings } from "./components/AppearanceSettings";
import { NotificationSettings } from "./components/NotificationSettings";
import { TrackingSettings } from "./components/TrackingSettings";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SettingsPage() {
  const {
    setting,
    handleChangeTheme,
    handleChangeLanguage,
    handleChangeTrackingMode,
    handleChangeMotivationFrequency,
    handleChangeReportDeadline,
  } = useSetting();

  const [activeTab, setActiveTab] = useState("appearance");
  const [haveNotification, setHaveNotification] = useState(
    setting.motivationFrequency !== MotivationFrequency.NEVER
  );

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when changing to desktop view
  useEffect(() => {
    if (isDesktop) {
      setIsMobileSidebarOpen(false);
    }
  }, [isDesktop]);

  const handleEmailNotificationToggle = (checked: boolean) => {
    setHaveNotification(checked);
    if (!checked) {
      handleChangeMotivationFrequency(MotivationFrequency.NEVER);
    } else {
      handleChangeMotivationFrequency(MotivationFrequency.DAILY);
    }
  };

  // Function to handle tab change and close mobile sidebar
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="container py-8 px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
      <SettingsHeader
        onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileMenuOpen={isMobileSidebarOpen}
        isMobile={!isDesktop}
      />

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 mt-8">
        {/* Sidebar - Only visible on desktop or when toggled on mobile */}
        {(isDesktop || isMobileSidebarOpen) && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className={
                isMobileSidebarOpen
                  ? "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                  : ""
              }
            >
              <div
                className={`${
                  isMobileSidebarOpen
                    ? "fixed left-0 top-0 z-50 h-full w-3/4 max-w-xs bg-background shadow-xl p-4"
                    : ""
                }`}
              >
                <SettingSidebar
                  activeTab={activeTab}
                  setActiveTab={handleTabChange}
                  isMobile={!isDesktop && isMobileSidebarOpen}
                  onCloseMobileMenu={() => setIsMobileSidebarOpen(false)}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Main content area - Always visible */}
        <div className="flex-1">
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="border-b bg-muted/30 pb-4">
              <CardTitle className="text-xl">
                {getTitleByTab(activeTab)}
              </CardTitle>
              <CardDescription>
                {getDescriptionByTab(activeTab)}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "appearance" && (
                    <AppearanceSettings
                      theme={setting.theme}
                      language={setting.language}
                      onChangeTheme={handleChangeTheme}
                      onChangeLanguage={handleChangeLanguage}
                    />
                  )}

                  {activeTab === "notifications" && (
                    <NotificationSettings
                      motivationFrequency={setting.motivationFrequency}
                      haveNotification={haveNotification}
                      onChangeMotivationFrequency={
                        handleChangeMotivationFrequency
                      }
                      onToggleEmailNotifications={handleEmailNotificationToggle}
                    />
                  )}

                  {activeTab === "tracking" && (
                    <TrackingSettings
                      trackingMode={setting.trackingMode}
                      reportDeadline={setting.reportDeadline}
                      onChangeTrackingMode={handleChangeTrackingMode}
                      onChangeReportDeadline={handleChangeReportDeadline}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper functions to get title and description based on active tab
function getTitleByTab(tab: string): string {
  switch (tab) {
    case "appearance":
      return "Giao diện & Ngôn ngữ";
    case "notifications":
      return "Thông báo";
    case "tracking":
      return "Theo dõi cai thuốc";
    default:
      return "Cài đặt";
  }
}

function getDescriptionByTab(tab: string): string {
  switch (tab) {
    case "appearance":
      return "Tùy chỉnh hiển thị và ngôn ngữ ứng dụng";
    case "notifications":
      return "Quản lý cách bạn nhận thông báo và nhắc nhở";
    case "tracking":
      return "Tùy chỉnh cách theo dõi tiến trình cai thuốc";
    default:
      return "Tùy chỉnh cài đặt ứng dụng";
  }
}
