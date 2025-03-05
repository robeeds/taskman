// @/src/app/register/page.tsx
"use client";

// Imports
import ThemeDropdown from "@/components/theme-dropdown";
import { useActionState, useState } from "react";
import Link from "next/link";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { register } from "@/lib/appwrite";

export default function Page() {
  const [state, action, pending] = useActionState(register, undefined);
  const [showPassword, setShowPassword] = useState(false); // State to show password visibility

  return (
    <div className="bg-bgSecondary text-textPrimary flex min-h-screen flex-1 flex-col justify-center p-8 pb-20 sm:p-20">
      {/* Theme Selector */}
      <div className="self-end pb-8">
        <ThemeDropdown />
      </div>

      {/* This will be the signup form */}
      <div className="flex flex-1 items-center justify-center">
        <form
          action={action}
          className="bg-bgPrimary flex min-w-[270px] flex-col items-center justify-center gap-6 self-center rounded-[15px] p-10 md:min-w-[600px]"
        >
          {/* Title */}
          <p className="pb-2 text-3xl font-semibold">Register</p>
          <hr className="border-textPrimary flex w-full flex-1 rounded-full" />

          {/* This will be the Name Field */}
          <div className="flex w-full flex-1 flex-col gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              autoComplete="true"
              required
              className="bg-bgSecondary rounded-[10px] p-2"
            />
            {state?.errors?.name && (
              <p className="text-warning flex flex-1 self-start">
                {state.errors.name}
              </p>
            )}
          </div>

          {/* This will be the Email Field */}
          <div className="flex w-full flex-1 flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="true"
              required
              className="bg-bgSecondary rounded-[10px] p-2"
            />
            {state?.errors?.email && (
              <p className="text-warning flex flex-1 self-start">
                {state.errors.email}
              </p>
            )}
          </div>

          {/* This will be the Password Field */}
          <div className="flex w-full flex-1 flex-col gap-1">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <div className="bg-bgSecondary flex rounded-[10px] p-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="true"
                required
                className="bg-bgSecondary flex flex-1"
              />

              {/* Password Visibility Toggle */}
              {showPassword ? (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <EyeIcon
                    width={24}
                    height={24}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="hover:cursor-pointer"
                  />
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <EyeSlashIcon
                    width={24}
                    height={24}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="hover:cursor-pointer"
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* This will be the Confirm Password Field */}
          <div className="flex w-full flex-1 flex-col gap-1">
            <p className="font-medium">Confirm Password</p>
            <div className="bg-bgSecondary flex rounded-[10px] p-2">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="true"
                required
                className="bg-bgSecondary flex flex-1"
              />

              {/* Password Visibility Toggle */}
              {showPassword ? (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <EyeIcon
                    width={24}
                    height={24}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="hover:cursor-pointer"
                  />
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <EyeSlashIcon
                    width={24}
                    height={24}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="hover:cursor-pointer"
                  />
                </motion.div>
              )}
            </div>
            {/* Password Errors */}
            {state?.errors?.password && (
              <div className="text-warning flex flex-1 flex-col self-start">
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {state?.message && <p className="text-warning">{state.message}</p>}

          {/* This will be the login button */}
          <motion.button
            type="submit"
            disabled={pending}
            className="bg-button my-6 self-center rounded-full hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowRightEndOnRectangleIcon
              width={32}
              height={32}
              className="text-bgPrimary m-2"
            />
          </motion.button>

          {/* Link to Login Page */}
          <div className="flex flex-1 flex-row">
            <p className="text-textSecondary">
              Already have an account? Log in{" "}
              <Link
                href="login"
                className="text-link hover:cursor-pointer hover:underline"
              >
                here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
