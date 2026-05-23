"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { memo } from "react";

interface Props {
  categories: string[];

  selectedCategories: string[];

  onChange: (categories: string[]) => void;

  selectedRating: number;

  onRatingChange: (rating: number) => void;
}

function ProductFilters({
  categories,
  selectedCategories,
  onChange,
  selectedRating,
  onRatingChange,
}: Props) {
  const toggleCategory = (
    category: string
  ) => {
    if (
      selectedCategories.includes(category)
    ) {
      onChange(
        selectedCategories.filter(
          (c) => c !== category
        )
      );
    } else {
      onChange([
        ...selectedCategories,
        category,
      ]);
    }
  };

  const ratings = [5, 4, 3, 2];

  return (
    <div className="rounded-2xl border bg-card p-4 space-y-6">
      <div>
        <h3 className="mb-4 font-semibold text-sm">
          Categories
        </h3>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center gap-2"
            >
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(
                  category
                )}
                onCheckedChange={() =>
                  toggleCategory(category)
                }
              />

              <label htmlFor={`cat-${category}`} className="text-sm capitalize cursor-pointer select-none font-medium hover:text-foreground/80">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">
            Minimum Rating
          </h3>
          {selectedRating > 0 && (
            <button
              onClick={() => onRatingChange(0)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-2">
          {ratings.map((rating) => {
            const isActive = selectedRating === rating;
            return (
              <button
                key={rating}
                onClick={() => onRatingChange(rating)}
                className={`flex items-center gap-2 w-full rounded-lg px-2 py-1.5 text-left text-sm transition-all hover:bg-muted ${
                  isActive ? "bg-muted font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs">
                  {rating === 5 ? "5.0 Stars" : `& up (${rating}.0+)`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductFilters);