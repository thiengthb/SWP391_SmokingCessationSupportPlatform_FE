import { Button } from "@/components/ui/button";
import { SunMedium, Bell, BarChart2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SettingSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile?: boolean;
  onCloseMobileMenu?: () => void;
}

export function SettingSidebar({
  activeTab,
  setActiveTab,
  isMobile = false,
  onCloseMobileMenu,
}: SettingSidebarProps) {
  const menuItems = [
    {
      id: "appearance",
      icon: <SunMedium className="w-4 h-4" />,
      label: "Giao diện & Ngôn ngữ",
    },
    {
      id: "notifications",
      icon: <Bell className="w-4 h-4" />,
      label: "Thông báo",
    },
    {
      id: "tracking",
      icon: <BarChart2 className="w-4 h-4" />,
      label: "Theo dõi cai thuốc",
    },
  ];

  return (
    <ScrollArea className={cn("h-full", isMobile ? "pb-16" : "")}>
      {isMobile && (
        <div className="flex items-center justify-between mb-4 px-1 pb-2 border-b">
          <div className="font-semibold">Menu Cài đặt</div>
          <Button variant="ghost" size="sm" onClick={onCloseMobileMenu}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              activeTab === item.id ? "font-medium" : ""
            )}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="flex items-center">
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </span>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
