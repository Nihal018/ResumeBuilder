import { useTheme } from "../ThemeContext";
import { Input } from "../UI/input";
import { Label } from "../UI/label";

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();

  const handleColorChange = (colorKey: string, value: string) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [colorKey]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Primary Color</Label>
        <Input
          type="color"
          value={theme.colors.primary}
          onChange={(e) => handleColorChange("primary", e.target.value)}
        />
      </div>
      {/* Add more color inputs */}
    </div>
  );
}
