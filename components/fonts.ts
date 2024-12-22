import { Font } from "@react-pdf/renderer";

export type FontFamily = "Rochester" | "Rufina" | "Ruluko" | "Shrikhand";

export const fontFamilyMap: Record<FontFamily, string> = {
  Rochester: "Rochester",
  Rufina: "Rufina",
  Ruluko: "Ruluko",
  Shrikhand: "Shrikhand",
};

// Register fonts
Font.register({
  family: "Rochester",
  src: "/fonts/Rochester.ttf",
});

Font.register({
  family: "Rufina",
  src: "/fonts/Rufina-Regular.ttf",
});

Font.register({
  family: "Ruluko",
  src: "/fonts/Ruluko-Regular.ttf",
});

Font.register({
  family: "Shrikhand",
  src: "/fonts/Shrikhand-Regular.ttf",
});
