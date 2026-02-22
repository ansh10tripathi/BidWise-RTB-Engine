"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Campaign exceeded budget threshold",
    description: "Campaign #2 has used 85% of allocated budget",
    timestamp: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    title: "CTR increased by 15%",
    description: "Your optimized strategy is performing better",
    timestamp: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    title: "New campaign created",
    description: "Campaign #5 has been successfully launched",
    timestamp: "3 hours ago",
    unread: false,
  },
  {
    id: "4",
    title: "Model retrained successfully",
    description: "CTR and CVR models updated with latest data",
    timestamp: "1 day ago",
    unread: false,
  },
];

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}
