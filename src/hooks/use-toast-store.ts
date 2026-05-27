import { create } from "zustand";

//creating a schema for our toast , exporting it to use in pages where we need it 
export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  createdAt: number;
}

//creating a schema for our toast managment , will help manage our toasts also will track unread notificaitons 
//data for notification mainly comes from here
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

  //some variables inside a object to keep track of state of our notifications
  toasts: [],
  notifications: [],
  unreadCount: 0,

// adding a function to add toast
  addToast: (toast) => {

    // generating a random id , setting default visible duration to be 4 second 
    const id = Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 4000;
    const newToast = { ...toast, id, duration, createdAt: Date.now() };
    
    // using set to update the state of our above variables
    set((state) => ({
      toasts: [...state.toasts, newToast],
      notifications: [newToast, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

// function to remove toasts
  removeToast: (id) =>

    //using set to remove the toast while id matches
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  // function to make the notifications list empty
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),

  // marking all the unread notification as 0
  markAllAsRead: () => set({ unreadCount: 0 }),
}));
