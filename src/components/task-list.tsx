// @/src/components/task-list.tsx
"use client";

// Imports
import { Suspense, useEffect, useState } from "react";
import { client, databases, Task } from "@/lib/appwrite";
import { motion } from "framer-motion";
import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import CreateButton from "./create-button";
import EditButton from "@/components/edit-button";
import { usePathname, useSearchParams } from "next/navigation";

// Constants
const DATABASE_ID = "67a113c40021c7fe3479";
const COLLECTION_ID = "67a113cc000fa69b928a";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Gets the initial Tasks
  const getTasks = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    const taskList = response.documents as Task[];
    setTasks(taskList);
  };

  // Fetch Tasks on component mount
  useEffect(() => {
    getTasks();
  }, []);

  // Apply filter when searchParams change
  useEffect(() => {
    // Filters tasks based on search params
    const applyFilter = (filter: string | null) => {
      // Filter by task importance
      if (filter == "important") {
        const importantTasks = tasks.filter((task) => task.isImportant == true);
        setFilteredTasks(importantTasks);
      } else if (filter == "completed") {
        const completeTasks = tasks.filter((task) => task.isCompleted == true);
        setFilteredTasks(completeTasks);
      } else {
        setFilteredTasks(tasks);
      }
    };
    const filter = searchParams.get("filter");
    applyFilter(filter);
  }, [searchParams, tasks]);

  // Allows realtime updates to the user's dashboard
  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (response) => {
        const eventType = response.events[0];
        const changedTask = response.payload as Task;
        if (eventType.includes(".create")) {
          setTasks((prevTasks) => [changedTask, ...prevTasks]);
        }
        if (eventType.includes(".update")) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.$id !== changedTask.$id ? task : changedTask,
            ),
          );
        }
        if (eventType.includes(".delete")) {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.$id !== changedTask.$id),
          );
        }
      },
    );

    return () => {
      unsubscribe();
    };
  }, [pathname, searchParams]);

  // Deletes the task
  const handleDelete = async (id: string) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {/* Create Button */}
      <div className="bg-bgPrimary rounded-[15px]">
        <CreateButton />
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        {/* Task Cards */}
        {filteredTasks.map((task) => (
          <div
            key={task.$id}
            id={task.$id}
            className="bg-bgPrimary col-span-1 flex h-[330px] flex-1 flex-col overflow-x-hidden rounded-[15px] p-4"
          >
            {/* This section will be the task title and importance */}
            <div className="flex flex-row items-center justify-between py-2">
              {/*Task Title */}
              <p className="truncate text-3xl font-semibold">{task.title}</p>
              <div className="">
                {task.isImportant === true ? (
                  <StarIcon width={32} height={32} className="" />
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* Description and Due Date */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Task Description */}
              <p className="text-textSecondary h-full overflow-y-scroll">
                {task.description}
              </p>

              {/* Task Due Date */}
              <p className="py-3 font-semibold">
                {task.dueDate != null
                  ? `Due: ${new Date(task.dueDate).toLocaleDateString()} at ${new Date(task.dueDate).toLocaleTimeString([], { timeStyle: "short" })}`
                  : ""}
              </p>
            </div>

            {/* Task Status, Edit and Delete Section */}
            <div className="flex flex-row items-center justify-between">
              {/* Task Status, change value based on today's date */}
              <p
                className={`rounded-full px-4 py-2 font-semibold ${task.isCompleted == true && "bg-success text-bgPrimary"} ${task.isCompleted == false && task.dueDate != null && new Date(task.dueDate) < new Date() && "bg-danger"} ${task.isCompleted == false && task.dueDate != null && new Date(task.dueDate) >= new Date() && "bg-warning"}`}
              >
                {task.isCompleted == true && "Complete!"}
                {task.isCompleted == false &&
                  task.dueDate != null &&
                  new Date(task.dueDate) < new Date() &&
                  "Incomplete!"}
                {task.isCompleted == false &&
                  task.dueDate != null &&
                  new Date(task.dueDate) >= new Date() &&
                  "In Progress"}
              </p>

              {/* Edit and Delete Section */}
              <div className="flex">
                {/* Edit Task Button */}
                <EditButton {...task} />

                {/* Delete Task Button */}
                <motion.button
                  onClick={() => handleDelete(task.$id)}
                  whileHover={{ scale: 1.1 }}
                  className="pl-2 hover:cursor-pointer"
                >
                  <TrashIcon width={32} height={32} />
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </Suspense>
    </div>
  );
}
