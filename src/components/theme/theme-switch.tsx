import { Theme } from "@/types/enums/Theme";
import { Switch } from "../ui/switch";
import { useSetting } from "@/contexts/SettingContext";

export default function ThemeSwitch() {
  const { setting, handleChangeTheme } = useSetting();

  const handleToggleTheme = (checked: boolean) => {
    handleChangeTheme(checked ? Theme.DARK : Theme.LIGHT);
  };

  return (
    <Switch
      checked={setting.theme === Theme.DARK}
      onCheckedChange={handleToggleTheme}
    />
  );
}
