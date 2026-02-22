"use client";

import { Bell, User, X, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/lib/NotificationContext";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClearAll = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearAll();
      setIsClearing(false);
    }, 300);
  };

  const handleViewAll = () => {
    setIsOpen(false);
    router.push("/notifications");
  };

  return (
    <header className="h-16 bg-white/5 backdrop-blur-xl border-b border-white/10 fixed top-0 right-0 left-64 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {isOpen && (
              <div
                className={`absolute right-0 mt-2 w-96 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${
                  isClearing ? "opacity-0 transition-opacity duration-300" : ""
                }`}
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                      <>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={handleClearAll}
                          className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors group"
                          title="Clear All"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-gray-400 text-sm">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                          notification.unread ? "bg-cyan-500/5" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`text-sm font-medium ${
                                notification.unread ? "text-white" : "text-gray-300"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 bg-white/5 border-t border-white/10">
                    <button
                      onClick={handleViewAll}
                      className="w-full text-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                    >
                      View All Notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

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
