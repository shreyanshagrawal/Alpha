"use client";

import { Input } from "@/components/ui/input";
import { memo } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function ProductSearch({
  value,
  onChange,
}: Props) {
  return (
    <Input
      placeholder="Search products..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="max-w-sm"
    />
  );
}

export default memo(ProductSearch);