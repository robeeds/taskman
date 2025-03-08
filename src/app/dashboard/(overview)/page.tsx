// @/src/app/dashboard/page.tsx
"use client";

// Imports
import TaskList from "@/components/task-list";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, Models } from "@/lib/appwrite";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [title, setTitle] = useState("");
  const searchParams = useSearchParams();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Gets the current user
  const getUser = async () => {
    try {
      const session = await getLoggedInUser();
      setUser(session);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Task Filter
  useEffect(() => {
    // Listening for url changes
    const filter = searchParams.get("filter");

    // Filter by task importance
    if (filter == "important") {
      setTitle("Important");
    } else if (filter == "completed") {
      setTitle("Completed");
    } else {
      setTitle("All");
    }
  }, [searchParams]);

  // Loading State
  if (loading) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-1 flex-col">
      {/* Primary Section for Viewing Tasks */}
      <div className={`z-[4] p-4`}>
        {/* Title */}
        <p className="self-center pl-2 pt-5 text-4xl font-bold md:self-start">
          {title} Tasks
        </p>

        {/* Divider */}
        <div className="flex w-full px-2 pb-4 pt-9 md:w-[10%]">
          <hr className="border-textPrimary flex w-full flex-1 rounded-full" />
        </div>

        {/* Task List */}
        <div className="">
          <TaskList />
        </div>
      </div>

      {/* Overlay for editing a task */}
    </div>
  );
}
