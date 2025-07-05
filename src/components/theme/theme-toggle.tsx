import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Theme } from "@/types/models/setting";
import { useSetting } from "@/contexts/SettingContext";

export function ModeToggle() {
  const { setting, handleChangeTheme } = useSetting();

  const handleToggleTheme = () => {
    handleChangeTheme(setting.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleToggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
