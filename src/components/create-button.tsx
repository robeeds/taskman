// @/src/components/create-button.tsx
"use client";

// Imports
import { motion } from "framer-motion";
import { ArrowLeftIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarOff } from "@heroicons/react/24/outline";
import { StarIcon as StarOn } from "@heroicons/react/24/solid";
import { useState } from "react";
import { databases, ID } from "@/lib/appwrite";

// Constants
const DATABASE_ID = "67a113c40021c7fe3479";
const COLLECTION_ID = "67a113cc000fa69b928a";

export default function CreateButton() {
  const [createOverlay, setCreateOverlay] = useState(false); // State to toggle task creation overlay

  // States to set task values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [important, setImportant] = useState(false);

  const createTask = async () => {
    let formattedDate = null;
    if (dueDate != null) {
      formattedDate = new Date(dueDate).toUTCString();
    }

    databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      title: title,
      description: description,
      dueDate: formattedDate,
      isImportant: important,
      isCompleted: false,
    });

    // Reset our values
    setTitle("");
    setDescription("");
    setDueDate(null);
    setImportant(false);
  };

  return (
    <div className="h-full w-full">
      <motion.div
        onClick={() => setCreateOverlay((prev) => !prev)}
        className="col-span-1 flex h-[330px] flex-1 flex-row items-center justify-center hover:cursor-pointer"
        whileHover={{ scale: 1.1 }}
      >
        <DocumentPlusIcon width={32} height={32} />
        <p className="px-2">New Task</p>
      </motion.div>

      {/* Overlay for creating new task */}
      {createOverlay ? (
        // Create Task Form
        <div className="">
          <div
            className={`fixed left-0 top-0 z-[5] h-full max-h-screen w-full overflow-scroll backdrop-blur-md`}
          >
            <div className="flex h-full flex-1 items-center">
              <div className="flex flex-1 justify-center">
                <form
                  action={createTask}
                  onSubmit={() => setCreateOverlay((prev) => !prev)}
                  className="flex flex-1 flex-col justify-center gap-6 rounded-[15px] p-4 md:max-w-[500px]"
                >
                  {/* Form Title */}
                  <p className="self-center pl-2 pt-5 text-3xl font-bold">
                    Create Task
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
                      placeholder="My Project"
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
                      placeholder="Create a full-stack application using Appwrite, Next.js, and Tailwind."
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
                      className="text-textTertiary bg-bgTertiary rounded-[10px] p-2"
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>

                  {/* isImportant Toggle */}
                  <div className="flex w-full flex-1 flex-row items-center justify-between gap-1">
                    <p className="font-medium">Important?</p>
                    <div>
                      <input
                        id="isImportant"
                        name="isImportant"
                        type="checkbox"
                        className="hidden"
                        onChange={() => setImportant((prev) => !prev)}
                      />
                      <label htmlFor="isImportant">
                        {important ? (
                          <StarOn width={28} height={28} />
                        ) : (
                          <StarOff width={28} height={28} />
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Back and Submit Buttons */}
                  <div className="flex flex-1 flex-row items-center justify-evenly">
                    {/* Back Button */}
                    <motion.div
                      className="flex items-center hover:cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setCreateOverlay((prev) => !prev)}
                    >
                      <ArrowLeftIcon width={28} height={28} />
                      <p className="p-2">Back</p>
                    </motion.div>

                    {/* Submit Button */}
                    <div className="flex">
                      <motion.button
                        type="submit"
                        className="bg-button flex flex-1 rounded-full"
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
