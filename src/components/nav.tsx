// @/src/test/nav.tsx
"use client";

// Imports
//import { getUser } from "@/actions/auth"
import { useEffect, useState } from "react";
import LogoutButton from "./logout-button";
import { getLoggedInUser } from "@/lib/appwrite";
//import NavLinks from "./navlinks";
import SettingsButton from "./settings-button";

export default function SideNav() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await getLoggedInUser();
      const username = user.name;
      setUser(username);
    };

    getUser();
  }, []);

  return (
    <div className="bg-bgSecondary fixed z-[5] flex w-full flex-1 flex-row items-center p-4 md:sticky md:flex-col md:items-start">
      {/* Username Section with Gear Icon (Settings) */}
      <div className="bg-bgPrimary flex flex-row rounded-l-[15px] p-4 md:w-full md:items-center md:justify-between md:rounded-t-[15px] md:rounded-bl-none md:rounded-tr-none">
        <div className="hidden md:flex md:flex-col">
          <p>Logged in as: </p>
          <p>{user}</p>
        </div>

        {/* Pass the settings button as a client component later on */}
        <SettingsButton />
      </div>

      {/* Divider */}
      <div className="hidden px-2 py-4 md:flex md:w-full">
        <hr className="border-textPrimary flex w-full flex-1 rounded-full" />
      </div>

      {/* Navigational Links */}
      <div className="bg-bgPrimary flex w-full flex-1 justify-between rounded-r-[15px] p-4 pl-0 md:flex-col md:rounded-bl-[15px] md:rounded-br-none md:rounded-tr-none md:pl-4 md:pt-4">
        <div className="flex flex-1">{/* <Navlinks /> */}</div>

        {/* This should be the logout button */}
        <div className="flex">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
