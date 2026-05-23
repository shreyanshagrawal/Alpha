"use client";

import { Badge } from "@/components/ui/badge";
import Loading from "@/components/shared/loading";
import { useProduct } from "@/features/products/hooks/use-product";
import ProductCarousel from "./product-carousel";

interface Props {
  id: string;
}

export default function ProductDetailClient({
  id,
}: Props) {
  const {
    data: product,
    isLoading,
    error,
  } = useProduct(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !product) {
    return (
      <div>
        Failed to load product.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          {product.title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {product.description}
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <ProductCarousel
  images={product.images}
  title={product.title}
/>


        {/* Info */}
        <div className="space-y-6">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">
              Price
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              ${product.price}
            </h2>
          </div>

          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">
              Stock Status
            </p>

            <Badge className="mt-3">
              {product.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </Badge>
          </div>

          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">
              Rating
            </p>

            <h3 className="mt-2 text-2xl font-semibold">
              ⭐ {product.rating}
            </h3>
          </div>

          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground">
              Category
            </p>

            <Badge
              variant="secondary"
              className="mt-3 capitalize"
            >
              {product.category}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}