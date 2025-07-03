import { Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsHeaderProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  isMobile: boolean;
}

export function SettingsHeader({
  onMobileMenuToggle,
  isMobileMenuOpen,
  isMobile,
}: SettingsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center">
          <Settings className="mr-2 h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Cài Đặt</h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          Tùy chỉnh ứng dụng theo sở thích cá nhân của bạn
        </p>
      </div>

      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuToggle}
          className="md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      )}
    </div>
  );
}
