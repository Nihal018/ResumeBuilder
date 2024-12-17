import { createContext, useContext, useState } from "react";
import { FontFamily } from "./fonts";

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: FontFamily;
    body: FontFamily;
  };
}

const defaultTheme: Theme = {
  colors: {
    primary: "#2C3E50",
    secondary: "#34495E",
    text: "#2C3E50",
    background: "#FFFFFF",
  },
  fonts: {
    heading: "Ruluko",
    body: "Ruluko",
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
