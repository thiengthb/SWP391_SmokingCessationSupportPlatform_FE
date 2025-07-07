import { Button } from "@/components/ui/button";
import { SunMedium, Bell, BarChart2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { fitlerTabItems, ForRoles } from "@/utils/tab.util";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

interface SettingSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile?: boolean;
  onCloseMobileMenu?: () => void;
}

const menuItems = [
  {
    id: "appearance",
    icon: <SunMedium className="w-4 h-4" />,
    label: "Giao diện & Ngôn ngữ",
    forRoles: [ForRoles.ALL],
  },
  {
    id: "notifications",
    icon: <Bell className="w-4 h-4" />,
    label: "Thông báo",
    forRoles: [ForRoles.ALL],
  },
  {
    id: "tracking",
    icon: <BarChart2 className="w-4 h-4" />,
    label: "Theo dõi cai thuốc",
    forRoles: [ForRoles.MEMBER],
  },
];

export function SettingSidebar({
  activeTab,
  setActiveTab,
  isMobile = false,
  onCloseMobileMenu,
}: SettingSidebarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredMenuItems = fitlerTabItems(menuItems);

  // Sync URL with active tab on mount
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (
      tabFromUrl &&
      filteredMenuItems.some((item: any) => item.id === tabFromUrl)
    ) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, setActiveTab, filteredMenuItems]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

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
        {filteredMenuItems.map((item: any) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              activeTab === item.id ? "font-medium" : ""
            )}
            onClick={() => handleTabChange(item.id)}
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
