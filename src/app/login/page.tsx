// @/src/app/login/page.tsx
"use client";

// Imports
import { login, Models, getLoggedInUser } from "@/lib/appwrite";
import ThemeDropdown from "@/components/theme-dropdown";
import { useActionState, useEffect, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false); // state to show password visiiblity
  const [state, action, pending] = useActionState(login, undefined);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

  // Checks if there is a current user session
  useEffect(() => {
    async function getUser() {
      try {
        const session = await getLoggedInUser();
        setUser(session);
      } catch {
        setUser(null);
      }
    }

    getUser();
  }, []);

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-bgSecondary text-textPrimary flex min-h-screen flex-1 flex-col justify-center p-8 pb-20 sm:p-20">
      {/* Theme Selector */}
      <div className="self-end pb-8">
        <ThemeDropdown />
      </div>

      {/* This will be the login form */}
      <div className="flex flex-1 items-center justify-center">
        <form
          action={action}
          className="bg-bgPrimary flex min-w-[270px] flex-col items-center justify-center gap-6 self-center rounded-md p-10 md:min-w-[600px] md:rounded-[20px]"
        >
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
            />
            {state?.errors?.email && (
              <p className="text-warning flex flex-1 self-start">
                {state.errors.email}
              </p>
            )}
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
    </div>
  );
}
