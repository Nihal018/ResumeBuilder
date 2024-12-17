import { useTheme } from "../ThemeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/tabs";
import { Card } from "@/components/UI/card";
import { FontFamily, fontFamilyMap } from "../fonts";

const fontOptions: Array<{ label: string; value: FontFamily }> = [
  { label: "Rochester", value: "Rochester" },
  { label: "Rufina", value: "Rufina" },
  { label: "Ruluko", value: "Ruluko" },
  { label: "Shrikhand", value: "Shrikhand" },
];
interface ColorOption {
  label: string;
  key: "primary" | "secondary" | "text";
}

const colorOptions: ColorOption[] = [
  { label: "Primary Color", key: "primary" },
  { label: "Secondary Color", key: "secondary" },
  { label: "Text Color", key: "text" },
];

export function CustomizationPanel() {
  const { theme, setTheme } = useTheme();

  const handleColorChange = (
    color: string,
    type: "primary" | "secondary" | "text"
  ) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [type]: color,
      },
    });
  };

  const handleFontChange = (value: FontFamily, type: "heading" | "body") => {
    setTheme({
      ...theme,
      fonts: {
        ...theme.fonts,
        [type]: value,
      },
    });
  };

  return (
    <Card className="p-4 mb-4">
      <Tabs defaultValue="colors">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="fonts">Fonts</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4 mt-4">
          {colorOptions.map((option) => (
            <div key={option.key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {option.label}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={theme.colors[option.key]}
                  onChange={(e) =>
                    handleColorChange(e.target.value, option.key)
                  }
                  className="w-16 h-8 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-600">
                  {theme.colors[option.key]}
                </span>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="fonts" className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Heading Font
            </label>
            <select
              value={theme.fonts.heading}
              onChange={(e) =>
                handleFontChange(e.target.value as FontFamily, "heading")
              }
              className="w-full p-2 border rounded bg-white"
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Body Font
            </label>

            <select
              value={theme.fonts.body}
              onChange={(e) =>
                handleFontChange(e.target.value as FontFamily, "body")
              }
              className="w-full p-2 border rounded bg-white"
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
