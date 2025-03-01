// @/src/app/dashboard/page.tsx
"use client";

// Imports
import { databases, getTasks, Models } from "@/lib/appwrite";
import { useEffect, useState } from "react";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTask = async () => {
      const tasks = await getTasks();
      console.log(tasks);
    };

    getTask();
  }, []);
  return (
    <div className="relative flex w-full flex-1 flex-col">
      {/* Primary Section for Viewing Tasks */}
      <div className={`z-[4] p-4`}>
        {/* Title */}
        <p className="self-center pl-2 pt-5 text-4xl font-bold md:self-start">
          {" "}
          All Tasks{" "}
        </p>

        {/* Divider */}
        <div className="flex w-full px-2 pb-4 pt-9 md:w-[10%]">
          <hr className="border-textPrimary flex w-full flex-1 rounded-full" />
        </div>

        {/* Task List */}
        {/* Use Realtime to retrieve and update task data */}
        <div className="">
          {/* <TaskCards {...data} /> */}
          {/** */}
        </div>
      </div>

      {/* Overlay for editing a task */}
    </div>
  );
}
