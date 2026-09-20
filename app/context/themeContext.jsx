import React, { createContext, useContext } from "react";

// Create the context
export const ThemeContext = createContext();

// Simple custom hook to use the context
export function useTheme() {
  return useContext(ThemeContext);
}
