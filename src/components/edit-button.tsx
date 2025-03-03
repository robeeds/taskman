// @/src/components/edit-button.tsx
"use client";

// Imports
import { motion } from "framer-motion";
import { PencilIcon, StarIcon as StarOn } from "@heroicons/react/24/solid";
import {
  ArrowLeftIcon,
  XCircleIcon,
  CheckCircleIcon,
  StarIcon as StarOff,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { databases, Task } from "@/lib/appwrite";

// Constants
const DATABASE_ID = "67a113c40021c7fe3479";
const COLLECTION_ID = "67a113cc000fa69b928a";

export default function EditButton(task: Task) {
  const [editOverlay, setEditOverlay] = useState(false); // State to handle edit task overlay

  // Placeholder for date

  // States to set task values
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [important, setImportant] = useState(task.isImportant);
  const [completed, setCompleted] = useState(task.isCompleted);

  const editTask = async () => {
    let formattedDate = null;
    if (dueDate != null) {
      formattedDate = new Date(dueDate).toUTCString();
    }

    databases.updateDocument(DATABASE_ID, COLLECTION_ID, task.$id, {
      title: title,
      description: description,
      dueDate: formattedDate,
      isImportant: important,
      isCompleted: completed,
    });
  };

  return (
    <div className="h-full w-full">
      <motion.button
        onClick={() => setEditOverlay((prev) => !prev)}
        whileHover={{ scale: 1.1 }}
        className="p-2 hover:cursor-pointer"
      >
        <PencilIcon width={32} height={32} />
      </motion.button>

      {/* Overlay for editing a task */}
      {editOverlay ? (
        // Edit Task Form
        <div className="">
          <div
            className={`fixed left-0 top-0 z-[5] h-full max-h-screen w-full overflow-scroll backdrop-blur-md`}
          >
            <div className="flex h-full flex-1 items-center">
              <div className="flex flex-1 justify-center">
                <form
                  action={editTask}
                  onSubmit={() => setEditOverlay((prev) => !prev)}
                  className="flex flex-1 flex-col justify-center gap-6 rounded-[15px] p-4 md:max-w-[500px]"
                >
                  {/* Form Title */}
                  <p className="self-center pl-2 pt-5 text-3xl font-bold">
                    Edit Task
                  </p>

                  {/* Divider */}
                  <div className="flex w-full pb-4 pt-9">
                    <hr className="border-textPrimary flex w-full flex-1 rounded-full" />
                  </div>

                  {/* Task Title */}
                  <div className="flex w-full flex-1 flex-col gap-1">
                    <p className="font-medium">Title</p>
                    <input
                      id="title"
                      name="title"
                      required
                      className="bg-bgTertiary placeholder:text-textTertiary rounded-[10px] p-2"
                      defaultValue={task.title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  {/* Description */}
                  <div className="flex w-full flex-1 flex-col gap-1">
                    <p className="font-medium">Description</p>
                    <textarea
                      id="description"
                      name="description"
                      maxLength={512}
                      className="bg-bgTertiary placeholder:text-textTertiary rounded-[10px] p-2 md:min-h-[200px]"
                      defaultValue={task.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* Due Date */}
                  <div className="flex w-full flex-1 flex-col gap-1">
                    <p className="font-medium">Due Date</p>
                    <input
                      id="dueDate"
                      name="dueDate"
                      type="datetime-local"
                      className="placeholder:text-textTertiary bg-bgTertiary rounded-[10px] p-2"
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>

                  {/* isImportant Toggle */}
                  <div className="flex w-full flex-1 flex-row items-center justify-between gap-1">
                    <p className="font-medium">Important?</p>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <input
                        id="isImportant"
                        name="isImportant"
                        type="checkbox"
                        className="hidden"
                        onChange={() => setImportant((prev) => !prev)}
                      />
                      <label htmlFor="isImportant">
                        {important ? (
                          <StarOn
                            width={28}
                            height={28}
                            className="hover:cursor-pointer"
                          />
                        ) : (
                          <StarOff
                            width={28}
                            height={28}
                            className="hover:cursor-pointer"
                          />
                        )}
                      </label>
                    </motion.div>
                  </div>

                  {/* isCompleted Toggle */}
                  <div className="flex w-full flex-1 flex-row items-center justify-between gap-1">
                    <p className="font-medium">Completed?</p>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <input
                        id="isCompleted"
                        name="isCompleted"
                        type="checkbox"
                        className="hidden"
                        onChange={() => setCompleted((prev) => !prev)}
                      />
                      <label htmlFor="isCompleted">
                        {completed ? (
                          <CheckCircleIcon
                            width={28}
                            height={28}
                            className="hover:cursor-pointer"
                          />
                        ) : (
                          <XCircleIcon
                            width={28}
                            height={28}
                            className="hover:cursor-pointer"
                          />
                        )}
                      </label>
                    </motion.div>
                  </div>

                  {/* Back and Submit Buttons */}
                  <div className="flex flex-1 flex-row items-center justify-evenly">
                    {/* Back Button */}
                    <motion.div
                      className="flex items-center hover:cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setEditOverlay((prev) => !prev)}
                    >
                      <ArrowLeftIcon width={28} height={28} />
                      <p className="p-2">Back</p>
                    </motion.div>

                    {/* Submit Button */}
                    <div className="flex">
                      <motion.button
                        type="submit"
                        className="bg-button flex flex-1 rounded-full hover:cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                      >
                        <p className="text-bgTertiary px-4 py-2 font-semibold">
                          Save
                        </p>
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
