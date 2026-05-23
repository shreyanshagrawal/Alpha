import { create } from "zustand";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  createdAt: number;
}

interface ToastStore {
  toasts: Toast[];
  notifications: Toast[];
  unreadCount: number;
  addToast: (toast: Omit<Toast, "id" | "createdAt">) => void;
  removeToast: (id: string) => void;
  clearNotifications: () => void;
  markAllAsRead: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  notifications: [],
  unreadCount: 0,
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 4000;
    const newToast = { ...toast, id, duration, createdAt: Date.now() };
    
    set((state) => ({
      toasts: [...state.toasts, newToast],
      notifications: [newToast, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
  markAllAsRead: () => set({ unreadCount: 0 }),
}));
