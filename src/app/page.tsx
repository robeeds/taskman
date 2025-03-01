// @/src/app/page.tsx
"use client";

// Imports
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ThemeDropdown from "@/components/theme-dropdown";

export default function Home() {
  return (
    <div className="bg-bgPrimary text-textPrimary flex min-h-screen flex-1 flex-col items-center justify-items-center p-8 pb-20 font-bold sm:p-20">
      {/* Theme Selector */}
      <div className="flex self-end">
        <ThemeDropdown />
      </div>

      {/* Center container */}
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Title */}
        <p className="flex pb-4 text-center">Taskman | A Task Management App</p>

        {/* Button */}
        <motion.a
          className="text-bgTertiary bg-button flex flex-row items-center rounded-full px-4 py-2"
          whileHover={{ scale: 1.1 }}
          href="login"
        >
          <p className="pr-4">Login</p>
          <ArrowRightIcon width={18} height={18} strokeWidth={3} />
        </motion.a>
      </div>
    </div>
  );
}
