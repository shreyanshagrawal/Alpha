"use client";

import { Menu, Bell } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Sidebar from "./sidebar";

import { Button } from "@/components/ui/button";

import ThemeToggle from "@/components/shared/theme-toggle";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                Navigation Menu
              </SheetTitle>

              <SheetDescription>
                Access dashboard navigation links.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6">
              <Sidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search / Title */}
      <div>
        <h2 className="text-lg font-semibold">
          Dashboard
        </h2>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <Avatar>
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}