"use client";

import { Bell, User } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-16 bg-white/5 backdrop-blur-xl border-b border-white/10 fixed top-0 right-0 left-64 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-cyan-500" />
            </div>
            <span className="text-sm text-gray-300">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
