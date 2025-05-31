import { Switch } from "../ui/switch";
import { useTheme } from "./theme-provider";

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme()
    
    const handleToggleTheme = () => {
    theme == "dark"? setTheme("light") : setTheme("dark");
    }
  return (
    <Switch onCheckedChange={handleToggleTheme}/>
  );
}