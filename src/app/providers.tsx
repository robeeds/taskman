// @/src/app/providers.tsx
"use client"

// Imports
import { ThemeProvider } from "next-themes";

export function Providers({children}: {children: React.ReactNode }) {
    return <ThemeProvider defaultTheme="gruvbox">{children}</ThemeProvider>
}