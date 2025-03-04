// @/src/components/navlinks.tsx
"use client";

// Imports
import { motion } from "framer-motion";
import { HomeIcon, StarIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function NavLinks() {
  const router = useRouter();
  return (
    <div className="flex flex-1 flex-row justify-center gap-4 md:flex-col md:items-start md:justify-start">
      {/* All Tasks Link */}
      <motion.button
        className="flex flex-row items-center hover:cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => router.push("/dashboard")}
      >
        <HomeIcon width={32} height={32} />
        <p className="hidden md:flex md:px-2">All Tasks</p>
      </motion.button>

      {/* Important tasks link */}
      <motion.button
        className="flex flex-row items-center hover:cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => router.push("/dashboard?filter=important")}
      >
        <StarIcon width={32} height={32} />
        <p className="hidden md:flex md:px-2">Important</p>
      </motion.button>

      {/* Completed Tasks Link */}
      <motion.button
        className="flex flex-row items-center hover:cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => router.push("/dashboard?filter=completed")}
      >
        <CheckIcon width={32} height={32} />
        <p className="hidden md:flex md:px-2">Completed</p>
      </motion.button>
    </div>
  );
}
