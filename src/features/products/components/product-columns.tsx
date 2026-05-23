"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Product } from "@/features/products/types/product";

import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.original.thumbnail}
        alt={row.original.title}
        className="h-14 w-14 rounded-lg object-cover"
      />
    ),
  },

  {
    accessorKey: "title",
    header: "Product Name",
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.category}
      </Badge>
    ),
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span>
        ${row.original.price}
      </span>
    ),
  },

  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.stock > 0
            ? "default"
            : "destructive"
        }
      >
        {row.original.stock > 0
          ? "In Stock"
          : "Out of Stock"}
      </Badge>
    ),
  },

  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <span>
        ⭐ {row.original.rating}
      </span>
    ),
  },
];