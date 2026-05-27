"use client";

import { useMemo } from "react";

import {
  Package,
  Star,
  DollarSign,
} from "lucide-react";

import StatsCard from "@/features/analytics/components/stats-card";

import dynamic from "next/dynamic";
import ProtectedRoute from "@/components/auth/protected-route";

const CategoryChart = dynamic(() => import("@/features/analytics/components/category-chart"), {
  loading: () => <div className="h-96 w-full animate-pulse bg-muted rounded-xl" />,
  ssr: false,
});

import { useProducts } from "@/features/products/hooks/use-products";
import { Product } from "@/features/products/types/product";

export default function AnalyticsPage() {
  const {
    data,
    isLoading,
    error,
  } = useProducts();

  // Analytics Calculations
  const analytics = useMemo(() => {
    if (!data) {
      return {
        totalProducts: 0,
        averageRating: 0,
        totalInventoryValue: 0,
        categoryData: [],
      };
    }

    // Total Products
    const totalProducts = data.length;

    // Average Rating
    const averageRating =
      data.reduce(
        (acc: number, product: Product) =>
          acc + product.rating,
        0
      ) / data.length;

    // Inventory Value
    const totalInventoryValue =
      data.reduce(
        (acc: number, product: Product) =>
          acc +
          product.price *
            product.stock,
        0
      );

    // Category Distribution
    const categoryMap = new Map<
      string,
      number
    >();

    data.forEach((product: Product) => {
      categoryMap.set(
        product.category,
        (categoryMap.get(
          product.category
        ) || 0) + 1
      );
    });

    const categoryData = Array.from(
      categoryMap.entries()
    ).map(([name, value]) => ({
      name,
      value,
    }));

    return {
      totalProducts,
      averageRating:
        averageRating.toFixed(1),
      totalInventoryValue:
        totalInventoryValue.toLocaleString(),
      categoryData,
    };
  }, [data]);

  if (isLoading) {
    return (
      <div>
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Failed to load analytics.
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Analytics
          </h1>

          <p className="text-muted-foreground">
            Product analytics overview.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Total Products"
            value={
              analytics.totalProducts
            }
            icon={
              <Package className="h-8 w-8 text-muted-foreground" />
            }
          />

          <StatsCard
            title="Average Rating"
            value={analytics.averageRating}
            icon={
              <Star className="h-8 w-8 text-muted-foreground" />
            }
          />

          <StatsCard
            title="Inventory Value"
            value={`$${analytics.totalInventoryValue}`}
            icon={
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            }
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 xl:grid-cols-2">
          <CategoryChart
            data={analytics.categoryData}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}