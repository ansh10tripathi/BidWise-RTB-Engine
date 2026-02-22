"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { NotificationProvider } from "@/lib/NotificationContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthGuard();

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-slate-950">
        <Sidebar />
        <TopBar />
        <main className="ml-64 pt-16">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </NotificationProvider>
  );
}
