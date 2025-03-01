// @/src/app/theme-providers.tsx
"use client";

// Imports
import { ThemeProvider } from "next-themes";

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="gruvbox">{children}</ThemeProvider>;
}
