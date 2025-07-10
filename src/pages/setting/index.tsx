import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSetting } from "@/contexts/SettingContext";
import { MotivationFrequency } from "@/types/enums/MotivationFrequency";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Bell, BarChart3 } from "lucide-react";

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

  const handleEmailNotificationToggle = (checked: boolean) => {
    setHaveNotification(checked);
    if (!checked) {
      handleChangeMotivationFrequency(MotivationFrequency.NEVER);
    } else {
      handleChangeMotivationFrequency(MotivationFrequency.DAILY);
    }
  };

  const tabs = [
    {
      id: "appearance",
      label: "Giao diện",
      icon: Palette,
    },
    {
      id: "notifications",
      label: "Thông báo",
      icon: Bell,
    },
    {
      id: "tracking",
      label: "Theo dõi",
      icon: BarChart3,
    },
  ];

  return (
    <div className="container py-8 px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
      <SettingsHeader
        onMobileMenuToggle={() => {}}
        isMobileMenuOpen={false}
        isMobile={false}
      />

      {/* Mobile Tabbar - Only visible on mobile */}
      {!isDesktop && (
        <div className="flex gap-2 mb-6 mt-8 p-1 bg-muted/50 rounded-lg overflow-x-auto border">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 px-4 py-3 h-auto min-w-[80px] text-xs font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 mt-8">
        {/* Desktop Sidebar - Only visible on desktop */}
        {isDesktop && (
          <SettingSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={false}
            onCloseMobileMenu={() => {}}
          />
        )}

        {/* Main content area - Always visible */}
        <div className="flex-1">
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="border-b bg-muted/30 pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                {(() => {
                  const currentTab = tabs.find((tab) => tab.id === activeTab);
                  const IconComponent = currentTab?.icon || Palette;
                  return (
                    <>
                      <IconComponent className="h-5 w-5 text-primary" />
                      {getTitleByTab(activeTab)}
                    </>
                  );
                })()}
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
