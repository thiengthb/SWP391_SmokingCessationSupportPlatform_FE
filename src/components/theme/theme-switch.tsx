import { Switch } from "../ui/switch";
import { useTheme } from "./theme-provider";

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    
    const handleToggleTheme = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    return (
        <Switch 
            checked={theme === "dark"}
            onCheckedChange={handleToggleTheme}
        />
    );
}