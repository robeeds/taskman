// @/src/components/theme-dropdown.tsx
"use client";

// Imports
import { SwatchIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeDropdown() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // List of themes, may move this to a separate file if it becomes long enough
  const themes = ["gruvbox", "catpuccin", "catpuccin-mocha"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // When the theme is selected, set the theme and close the dropdown
  const handleSelect = (theme: string) => {
    setTheme(theme);
    setIsOpen(false);
  };

  // Placeholder for dropdown menu to prevent cumulative layout shift
  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <button className="flex min-w-[150px] flex-row items-center justify-between px-4 py-2">
        <p className="mr-2 font-medium">Loading</p>
        <Image
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuMDk4MzUgMTkuOTA2M0M1LjU2MjgyIDIxLjM3MDggNy45MzcxOSAyMS4zNzA4IDkuNDAxNjUgMTkuOTA2M0wxNS44MDMzIDEzLjUwNDZNNi43NSAyMS4wMDQ2QzQuNjc4OTMgMjEuMDA0NiAzIDE5LjMyNTcgMyAxNy4yNTQ2VjQuMTI5NjRDMyAzLjUwODMyIDMuNTAzNjggMy4wMDQ2NCA0LjEyNSAzLjAwNDY0SDkuMzc1QzkuOTk2MzIgMy4wMDQ2NCAxMC41IDMuNTA4MzIgMTAuNSA0LjEyOTY0VjguMjAxMzRNNi43NSAyMS4wMDQ2QzguODIxMDcgMjEuMDA0NiAxMC41IDE5LjMyNTcgMTAuNSAxNy4yNTQ2VjguMjAxMzRNNi43NSAyMS4wMDQ2SDE5Ljg3NUMyMC40OTYzIDIxLjAwNDYgMjEgMjAuNTAxIDIxIDE5Ljg3OTZWMTQuNjI5NkMyMSAxNC4wMDgzIDIwLjQ5NjMgMTMuNTA0NiAxOS44NzUgMTMuNTA0NkgxNS44MDMzTTEwLjUgOC4yMDEzNEwxMy4zNzkxIDUuMzIyMjFDMTMuODE4NSA0Ljg4Mjg3IDE0LjUzMDggNC44ODI4NyAxNC45NzAxIDUuMzIyMjFMMTguNjgyNCA5LjAzNDUyQzE5LjEyMTggOS40NzM4NiAxOS4xMjE4IDEwLjE4NjIgMTguNjgyNCAxMC42MjU1TDE1LjgwMzMgMTMuNTA0Nk02Ljc1IDE3LjI1NDZINi43NTc1VjE3LjI2MjFINi43NVYxNy4yNTQ2WiIgc3Ryb2tlPSIjMEYxNzJBIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
          width={32}
          height={32}
          sizes="32x32"
          alt="Loading Light/Dark Toggle"
          priority={false}
          title="Loading Light/Dark Toggle"
        />
      </button>
    );

  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        type="button"
        className="bg-backgroundPrimary text-textPrimary hover:bg-bgSecondary flex min-w-[150px] flex-1 items-center justify-between rounded-md px-4 py-2 font-medium"
        onClick={toggleDropdown}
      >
        {resolvedTheme}
        <SwatchIcon width={32} height={32} className="ml-2" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="bg-bgSecondary absolute mt-2 w-full rounded-md shadow-lg ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {themes.map((theme, index) => (
              <a
                key={index}
                className="text-textSecondary hover:bg-bgPrimary hover:text-textPrimary block px-4 py-2 hover:cursor-pointer"
                onClick={() => handleSelect(theme)}
              >
                {theme}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
