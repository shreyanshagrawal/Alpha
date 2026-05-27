import { ReactNode } from "react";

import Sidebar from "./sidebar";
import Topbar from "./topbar";
import ProtectedRoute from "@/components/auth/protected-route";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
          <Sidebar />
        </aside>
        <div className="flex flex-1 flex-col min-w-0">
          <Topbar />
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}