import { create } from "zustand";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 4000;
    
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id, duration }],
    }));
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
