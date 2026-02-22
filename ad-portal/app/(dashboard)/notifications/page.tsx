"use client";

import { useNotifications } from "@/lib/NotificationContext";
import { Bell, Trash2, CheckCheck } from "lucide-react";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-gray-400 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up"}
          </p>
        </div>
        {notifications.length > 0 && (
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
                Mark All Read
              </button>
            )}
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-slate-900 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
              <Bell className="w-8 h-8 text-cyan-500" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            You're all caught up 🎉
          </h2>
          <p className="text-gray-400">No notifications to display</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`bg-slate-900 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-slate-800/50 transition-all cursor-pointer ${
                notification.unread ? "border-cyan-500/30 bg-cyan-500/5" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {notification.unread && (
                    <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        notification.unread ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                </div>
                {notification.unread && (
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full flex-shrink-0">
                    New
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
