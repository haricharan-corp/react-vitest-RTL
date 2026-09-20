import React from "react";
import { useTheme } from "./themeContext";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
