"use client";

import { Suspense } from "react";
import ProductTable from "@/features/products/components/product-table";
import ProductSearch from "@/features/products/components/product-search";
import ProductFilters from "@/features/products/components/product-filters";
import { useProducts } from "@/features/products/hooks/use-products";
import { useMockWebsocket } from "@/features/products/hooks/use-mock-websocket";
import { useProductFilters } from "@/features/products/hooks/use-product-filters";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

function ProductsPageContent() {
  const { data, isLoading, error } = useProducts();

  // Mock real-time WebSocket push updates
  const { triggerUpdate } = useMockWebsocket(data);

  // Filter & URL synchronization logic
  const {
    search,
    selectedCategories,
    ratingParam,
    categories,
    sorting,
    filteredProducts,
    handleSortingChange,
    handleSearchChange,
    handleCategoryChange,
    handleRatingChange,
  } = useProductFilters(data);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Failed to load products.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory.</p>
        </div>
        <Button onClick={triggerUpdate} variant="outline" className="gap-2 shrink-0">
          <Zap className="h-4 w-4" />
          Simulate Live Update
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64">
          <ProductFilters
            categories={categories}
            selectedCategories={selectedCategories}
            onChange={handleCategoryChange}
            selectedRating={ratingParam}
            onRatingChange={handleRatingChange}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4 min-w-0">
          {/* Search */}
          <ProductSearch
            value={search}
            onChange={handleSearchChange}
          />

          {/* Table */}
          <ProductTable
            data={filteredProducts}
            sorting={sorting}
            setSorting={handleSortingChange}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 items-center justify-center text-sm font-semibold text-muted-foreground">
          Loading inventory dashboard...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
