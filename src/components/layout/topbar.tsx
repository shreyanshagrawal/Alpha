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

import { useToastStore } from "@/hooks/use-toast-store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Topbar() {
  const notifications = useToastStore((state) => state.notifications);
  const unreadCount = useToastStore((state) => state.unreadCount);
  const clearNotifications = useToastStore((state) => state.clearNotifications);
  const markAllAsRead = useToastStore((state) => state.markAllAsRead);

  const formatTimeAgo = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

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
        
        {/* Notifications */}
        <DropdownMenu onOpenChange={(open) => { if (open) markAllAsRead(); }}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 rounded-xl shadow-lg border p-1.5 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between px-2 py-1.5">
              <DropdownMenuLabel className="font-bold text-sm p-0">Notifications</DropdownMenuLabel>
              {notifications.length > 0 && (
                <button onClick={clearNotifications} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Clear all
                </button>
              )}
            </div>
            <DropdownMenuSeparator className="my-1" />
            
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No new notifications
              </div>
            ) : (
              notifications.slice(0, 5).map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="text-sm font-semibold">{notif.title}</span>
                  {notif.description && (
                    <span className="text-xs text-muted-foreground line-clamp-2">{notif.description}</span>
                  )}
                  <span className="text-[10px] text-muted-foreground font-medium mt-0.5">{formatTimeAgo(notif.createdAt)}</span>
                </DropdownMenuItem>
              ))
            )}
            
            {notifications.length > 5 && (
              <>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem className="w-full text-center text-primary justify-center cursor-pointer rounded-lg font-medium">
                  View all {notifications.length} notifications
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-border/50 shadow-sm">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">SA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-xl shadow-lg border p-1.5" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-2">
              <div className="flex flex-col space-y-1.5">
                <p className="text-sm font-bold leading-none">Shreyansh</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@hubx.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="cursor-pointer rounded-lg px-2.5 py-2">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg px-2.5 py-2">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg px-2.5 py-2">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer rounded-lg px-2.5 py-2 font-medium">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}