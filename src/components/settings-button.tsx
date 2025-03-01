// @/src/components/settings-button.tsx
"use client";

// Imports
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function SettingsButton() {
  return (
    <div className="flex">
      <motion.a
        whileHover={{ scale: 1.1 }}
        className="hover:cursor-pointer"
        href="/dashboard/settings"
      >
        <Cog6ToothIcon width={32} height={32} />
      </motion.a>
    </div>
  );
}
