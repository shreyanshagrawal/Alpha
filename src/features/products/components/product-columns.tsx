"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";

import { Product } from "@/features/products/types/product";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { usePublishStore } from "@/features/products/hooks/use-publish-store";
import { useAuth } from "@/context/auth-context";

const PublishCell = ({ row }: { row: Row<Product> }) => {
  const { role } = useAuth();
  const { togglePublish, publishedIds } = usePublishStore();
  const isPublished = publishedIds[row.original.id];

  if (role !== "admin") {
    return (
      <Badge variant={isPublished ? "default" : "secondary"}>
        {isPublished ? "Published" : "Draft"}
      </Badge>
    );
  }

  return (
    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
      <Switch 
        checked={isPublished} 
        onCheckedChange={() => togglePublish(row.original.id)} 
      />
      <span className="text-xs text-muted-foreground">
        {isPublished ? "Yes" : "No"}
      </span>
    </div>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.thumbnail}
        alt={row.original.title}
        width={56}
        height={56}
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

  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ row }) => <PublishCell row={row} />,
  },
];