// @/src/app/login/page.tsx
"use client";

// Imports
import { login, Models } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import ThemeDropdown from "@/components/theme-dropdown";
import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  const [loggedInUser, setLoggedInUser] = useState<Models.Preferences | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    const user = await login(email, password);
    setLoggedInUser(user);
  };

  if (loggedInUser) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-bgSecondary text-textPrimary flex min-h-screen flex-1 flex-col items-center justify-items-center p-8 pb-20 sm:p-20">
      {/* Theme Selector */}
      <div className="flex self-end pb-8">
        <ThemeDropdown />
      </div>

      {/* This will be the login form */}
      <form className="bg-bgPrimary flex min-w-[270px] flex-col items-center justify-center gap-6 rounded-md p-10 md:min-w-[600px] md:rounded-[20px]">
        {/* Title */}
        <p className="pb-2 text-3xl font-semibold">Login</p>
        <hr className="border-textPrimary flex w-full flex-1 rounded-full" />

        {/* This will be the Email Field */}
        <div className="flex w-full flex-1 flex-col gap-1">
          <p className="font-medium">Email</p>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="true"
            required
            className="bg-bgSecondary rounded-[10px] p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* This will be the Password Field */}
        <div className="flex w-full flex-1 flex-col gap-1">
          <p className="font-medium">Password</p>
          <div className="bg-bgSecondary flex rounded-[10px] p-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="true"
              required
              className="bg-bgSecondary flex flex-1"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Password Visibility Toggle */}
            {showPassword ? (
              <EyeIcon
                width={24}
                height={24}
                onClick={() => setShowPassword((prev) => !prev)}
                className="hover:cursor-pointer"
              />
            ) : (
              <EyeSlashIcon
                width={24}
                height={24}
                onClick={() => setShowPassword((prev) => !prev)}
                className="hover:cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* This will be the login button */}
        <motion.button
          type="button"
          onClick={() => handleSubmit(email, password)}
          className="bg-button my-6 self-center rounded-full hover:cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <ArrowRightEndOnRectangleIcon
            width={32}
            height={32}
            className="text-bgPrimary m-2"
          />
        </motion.button>

        {/* Link to Register Page */}
        <div className="flex flex-1 flex-row">
          <p className="text-textSecondary">
            Don&apos;t have an account? Sign up{" "}
            <Link
              href="register"
              className="text-link hover:cursor-pointer hover:underline"
            >
              here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
