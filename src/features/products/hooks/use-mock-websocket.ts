import { useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/hooks/use-toast-store";
import { Product } from "@/features/products/types/product";

export function useMockWebsocket(data: Product[] | undefined) {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const triggerUpdate = useCallback(() => {
    if (!data || data.length === 0) return;

    // Pick a random product to update
    const randomIndex = Math.floor(Math.random() * data.length);
    const product = data[randomIndex];

    const shouldUpdatePrice = Math.random() > 0.5;
    let title = "";
    let description = "";
    let type: "info" | "success" | "warning" | "error" = "info";

    const updatedProducts = data.map((p: Product) => {
      if (p.id === product.id) {
        if (shouldUpdatePrice) {
          const oldPrice = p.price;
          const pct = (Math.random() * 8 - 4) / 100; // -4% to +4%
          const change = Math.round(oldPrice * pct) || (Math.random() > 0.5 ? 1 : -1);
          const newPrice = Math.max(1, oldPrice + change);

          if (newPrice < oldPrice) {
            title = "⚡ Price Drop Alert!";
            description = `${p.title} price dropped to $${newPrice} (was $${oldPrice})!`;
            type = "success";
          } else {
            title = "📈 Price Adjusted";
            description = `${p.title} price updated to $${newPrice} (was $${oldPrice}).`;
            type = "info";
          }
          return { ...p, price: newPrice };
        } else {
          const oldStock = p.stock;
          const change = Math.random() > 0.45 ? -1 : 1;
          const newStock = Math.max(0, oldStock + change);

          if (newStock === 0) {
            title = "🚨 Out of Stock!";
            description = `${p.title} is now completely sold out!`;
            type = "error";
          } else if (newStock < 5 && oldStock >= 5) {
            title = "⚠️ Low Stock Warning";
            description = `${p.title} is running low! Only ${newStock} remaining.`;
            type = "warning";
          } else {
            title = "📦 Stock Adjusted";
            description = `${p.title} inventory level updated to ${newStock} units.`;
            type = "info";
          }
          return { ...p, stock: newStock };
        }
      }
      return p;
    });

    // Update cache instantly
    queryClient.setQueryData(["products"], updatedProducts);

    // Trigger notification
    addToast({
      title,
      description,
      type,
      duration: 4500,
    });
  }, [data, queryClient, addToast]);

  useEffect(() => {
    const interval = setInterval(triggerUpdate, 12000);
    return () => clearInterval(interval);
  }, [triggerUpdate]);

  return { triggerUpdate };
}
