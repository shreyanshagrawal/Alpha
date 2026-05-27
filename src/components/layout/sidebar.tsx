"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { sidebarLinks } from "@/constants/sidebar";
import { useAuth } from "@/context/auth-context";

// a side bar component
export default function Sidebar({ className }: { className?: string }) {
  // get active paths name
  const pathname = usePathname();
  const { role } = useAuth();

  return (
    <div className={cn("flex h-full w-full flex-col bg-background p-4", className)}>
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold tracking-tight">
          {role === "admin" ? "AdminPanel" : "Users Panel"}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">

        {/* this is a list of elements that are to be displayed  */}
        {sidebarLinks.map((link) => {
          // Hide analytics for non-admin users
          if (link.title === "Analytics" && role !== "admin") return null;

          // checking if the path is active
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.title}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary"
              )}
            >
              <link.icon className="h-5 w-5" />

              {link.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}