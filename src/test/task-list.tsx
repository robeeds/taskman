// @/src/test/task-card.tsx
"use client";

// Imports
import { useEffect, useState } from "react";
import { client, databases, Task } from "@/lib/appwrite";
import { motion } from "framer-motion";
import { StarIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// Constants
const DATABASE_ID = "67a113c40021c7fe3479";
const COLLECTION_ID = "67a113cc000fa69b928a";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Gets the initial Tasks
  const getTasks = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    const taskList = response.documents as Task[];
    console.log("This is the task list: ", taskList);
    setTasks(taskList);
  };

  // Allows realtime updates to the user's dashboard
  useEffect(() => {
    getTasks();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (response) => {
        const eventType = response.events[0];
        const changedTask = response.payload as Task;
        if (eventType.includes(".create")) {
          console.log("A task was created");
          setTasks((prevTasks) => [changedTask, ...prevTasks]);
        }
        if (eventType.includes(".update")) {
          console.log("A task was updated");
          setTasks((prevTasks) => [changedTask, ...prevTasks]);
        }
        if (eventType.includes(".delete")) {
          console.log("A task was deleted");
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.$id !== changedTask.$id),
          );
        }
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async (id: string) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {/* Create Button */}
      <div className="bg-bgPrimary rounded-[15px] hover:cursor-pointer">
        {/*<CreateButton />*/}
      </div>

      {/* Task Cards */}
      {tasks.map((task) => (
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
          <div className="flex flex-1 flex-col">
            {/* Task Description */}
            <p className="text-textSecondary line-clamp-6">
              {task.description}
            </p>

            {/* Task Due Date */}
            <p className="py-3 font-semibold">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>

          {/* Task Status, Edit and Delete Section */}
          <div className="flex flex-row items-center justify-between">
            {/* Task Status, change value based on today's date */}
            <p
              className={`rounded-full px-4 py-2 ${
                new Date(task.dueDate).toLocaleDateString() >=
                  new Date().toLocaleDateString() && task.isCompleted != true
                  ? "bg-warning"
                  : "bg-danger"
              }`}
            >
              {new Date(task.dueDate).toLocaleDateString() >=
                new Date().toLocaleDateString() && task.isCompleted != true
                ? "Pending"
                : "Incomplete!"}
            </p>

            {/* Edit and Delete Section */}
            <div className="">
              {/* Edit Task Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:cursor-pointer"
              >
                <PencilIcon width={32} height={32} />
              </motion.button>

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
    </div>
  );
}
