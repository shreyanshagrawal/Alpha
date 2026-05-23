"use client";

import { useToastStore, Toast } from "@/hooks/use-toast-store";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useEffect } from "react";

function ToastItem({ toast }: { toast: Toast }) {

  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />;
      case "warning":
        return <AlertCircle className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />;
      case "error":
        return <AlertCircle className="h-4.5 w-4.5 text-rose-500 flex-shrink-0" />;
      case "info":
      default:
        return <Sparkles className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0 animate-pulse" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case "success":
        return "border-l-4 border-l-emerald-500";
      case "warning":
        return "border-l-4 border-l-amber-500";
      case "error":
        return "border-l-4 border-l-rose-500";
      case "info":
      default:
        return "border-l-4 border-l-indigo-500";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.95, filter: "blur(4px)" }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`flex items-start gap-3 rounded-2xl border bg-card/95 backdrop-blur-md shadow-xl p-4 w-full pr-10 relative overflow-hidden ${getBorderColor()}`}
    >
      {getIcon()}
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-foreground tracking-tight">
          {toast.title}
        </h4>
        {toast.description && (
          <p className="text-[11px] text-muted-foreground leading-normal font-medium">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="absolute top-3.5 right-3.5 p-0.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

export default function ToasterContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2.5 w-full max-w-sm px-4 md:px-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
