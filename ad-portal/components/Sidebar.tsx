"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Target, BarChart3, Settings, Zap, LogOut } from "lucide-react";
import { logout } from "@/lib/auth";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Target },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0 flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Zap className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">BidWise</h1>
            <p className="text-xs text-slate-400">Ad Portal</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-slate-400 hover:bg-red-500/10 hover:text-red-400 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
