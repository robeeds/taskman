// @/src/components/settings-button.tsx
"use client";

// Imports
import { useState } from "react";
import { motion } from "framer-motion";
import { Cog6ToothIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ThemeDropdown from "./theme-dropdown";

export default function SettingsButton() {
  const [settingsOverlay, setSettingsOverlay] = useState(false);

  return (
    <div className="">
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="hover:cursor-pointer"
        onClick={() => setSettingsOverlay((prev) => !prev)}
      >
        <Cog6ToothIcon width={32} height={32} />
      </motion.button>

      {/* Settings Overlay */}
      {settingsOverlay ? (
        <div className="">
          <div className="fixed left-0 top-0 z-[5] flex h-full max-h-screen w-full overflow-scroll backdrop-blur-md">
            <div className="flex flex-1 items-center justify-center">
              <div className="bg-bgPrimary flex flex-1 flex-col items-center rounded-[15px] p-10 md:max-w-[500px]">
                {/* Title */}
                <p className="text-3xl font-semibold">Settings</p>

                {/* Divider */}
                <div className="flex w-full pb-4 pt-8">
                  <hr className="border-textPrimary flex w-full flex-1 rounded-full" />
                </div>

                {/* Theme Dropdown */}
                <div className="flex w-full flex-1 flex-row items-center justify-between">
                  <p>Select Theme: </p>
                  <ThemeDropdown />
                </div>

                {/* Back Button */}
                <div className="mt-10 flex h-full w-full flex-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSettingsOverlay((prev) => !prev)}
                    className="flex items-center hover:cursor-pointer"
                  >
                    <ArrowLeftIcon width={32} height={32} className="p-2" />
                    <p>Back</p>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
