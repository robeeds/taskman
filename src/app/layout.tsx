// @/src/app/layout.tsx

// Imports
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Font
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
})

// Metadata
export const metadata: Metadata = {
  title: "TaskMan",
  description: "A task management app made by robeeds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
 {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaCode.variable} font-[family-name:var(--font-fira-code)] antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
