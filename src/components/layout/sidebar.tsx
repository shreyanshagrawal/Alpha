"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants/sidebar";

import { cn } from "@/lib/utils";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn("flex h-full w-full flex-col bg-background p-4", className)}>
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold tracking-tight">
          AdminPanel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map((link) => {
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