// @/src/app/dashboard/layout.tsx

// Imports
import SideNav from "@/components/nav";
import { Suspense } from "react";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-textPrimary bg-bgTertiary flex min-h-screen flex-1 flex-col md:flex-row">
      {/* This will be the side navigation panel */}
      <div className="mb-4 flex min-h-[80px] rounded-[15px] md:top-0 md:mb-0 md:mr-4 md:max-h-screen md:max-w-[300px] md:flex-1">
        <SideNav />
      </div>

      {/* This will be the general task area */}
      <div className="bg-bgSecondary flex max-h-screen flex-1 overflow-scroll">
        {children}
      </div>
    </div>
  );
}
